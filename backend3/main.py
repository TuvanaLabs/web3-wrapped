import uvicorn
import logging
import os

from typing import Union, Dict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from gql import gql, Client
from gql.transport.aiohttp import log as aiohttp_logger
from gql.transport.aiohttp import AIOHTTPTransport
from queries import all_queries, sample_prompt_queries
from pydantic import BaseModel
from dotenv import load_dotenv
from agents.text2gql import text_to_graphql
from agents.analyst import analyze

# Load environment variables from .env file
load_dotenv()

# Logging configuration
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)
aiohttp_logger.setLevel(logging.ERROR)


def initialize_graphql_clients() -> Dict[str, Client]:
    # Environment variables for configuration
    endpoints = {
        "v1": os.getenv("GRAPHQL_ENDPOINT_V1"),
        "v2": os.getenv("GRAPHQL_ENDPOINT_V2")
    }
    api_key_v1 = os.getenv("X_API_KEY")
    bearer_token_v2 = os.getenv("ACCESS_TOKEN")

    clients = {
        "v1": Client(
            transport=AIOHTTPTransport(
                url=endpoints["v1"],
                headers={"Content-Type": "application/json", "X-API-KEY": api_key_v1}
            ),
            fetch_schema_from_transport=True
        ),
        "v2": Client(
            transport=AIOHTTPTransport(
                url=endpoints["v2"],
                headers={"Content-Type": "application/json", "Authorization": f"Bearer {bearer_token_v2}"}
            ),
            fetch_schema_from_transport=True
        )
    }

    return clients


# Initialize the GraphQL clients
gql_clients = initialize_graphql_clients()

# FastAPI application setup
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def root():
    return "Web3Wrapped"


async def execute_query(session, query: gql, params: dict) -> dict:
    try:
        return await session.execute(query, variable_values=params)
    except Exception as e:
        logger.error(f"Error executing query: {e}")
        raise HTTPException(status_code=500, detail=str(e))


async def run_queries(blockchain_address: str, queries: dict) -> dict:
    results = {}
    try:
        for name, query_info in queries.items():
            client = gql_clients[query_info["schema_version"]]
            async with client as session:
                query = query_info["query"]
                params = {"blockchain_address": blockchain_address}
                result = await execute_query(session, query, params)
                results[name] = result
    except Exception as e:
        logger.error(f"Error running queries: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    return results


@app.get("/stats/{blockchain_address}")
async def get_stats(blockchain_address: str, q: Union[str, None] = None) -> dict:
    if not blockchain_address:
        raise HTTPException(status_code=400, detail="blockchain_address is required")

    graphql_queries = all_queries
    combined_result = await run_queries(blockchain_address, graphql_queries)
    return combined_result


class Message(BaseModel):
    blockchain_address: str
    prompt: str
    tag: str


@app.post("/chat")
async def chat(message: Message) -> dict:
    blockchain_address = message.blockchain_address
    if not blockchain_address:
        raise HTTPException(status_code=400, detail="blockchain_address is required")

    graphql_query = sample_prompt_queries[message.tag]
    params = {"blockchain_address": blockchain_address}

    try:
        query = graphql_query["query"]
        client = gql_clients[graphql_query["schema_version"]]

        # query = text_to_graphql(message.prompt)
        # print(f"GQL QUERY:\n{query}")
        # client = gql_clients["v2"]

        async with client as session:
            result = await execute_query(session, query, params)

        # print(f"GQL RESULT:\n{result}")

        analysis = analyze(message.prompt, result)

        return {
            "data": result,
            "chart": "",
            "analysis": analysis
        }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
