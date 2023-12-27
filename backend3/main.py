import uvicorn
import logging
import os
import json

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from gql import gql, Client
from gql.transport.aiohttp import log as aiohttp_logger
from gql.transport.aiohttp import AIOHTTPTransport
from typing import Union, Dict

from queries import all_queries, sample_prompt_queries
from pydantic import BaseModel
from agents.text2data import text_to_data
from agents.analyst import analyze
from services.gql2data import run_queries, execute_query

from mocks import mock_stats

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
    allow_origins=[
        # "*"
        "35.160.120.126",
        "44.233.151.27",
        "34.211.200.85",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def root():
    return "Web3Wrapped"


@app.get("/stats/{blockchain_address}")
async def get_stats(blockchain_address: str, q: Union[str, None] = None) -> dict:
    if not blockchain_address:
        raise HTTPException(status_code=400, detail="blockchain_address is required")

    graphql_queries = all_queries
    combined_result = await run_queries(blockchain_address, graphql_queries, gql_clients)
    return combined_result


@app.get("/mocks/stats")
async def get_mock_stats() -> dict:
    mock_data = json.loads(mock_stats)
    return mock_data


class Message(BaseModel):
    blockchain_address: str
    prompt: str
    tag: str


@app.post("/chat")
async def chat(message: Message) -> dict:
    blockchain_address = message.blockchain_address
    if not blockchain_address:
        raise HTTPException(status_code=400, detail="blockchain_address is required")

    params = {"blockchain_address": blockchain_address}

    try:
        # tag pre-processed solution
        graphql_query = sample_prompt_queries[message.tag]
        query = graphql_query["query"]
        client = gql_clients[graphql_query["schema_version"]]
        async with client as session:
            result = await execute_query(session, query, params)

        # dynamic solution
        # client = gql_clients["v2"]
        # result = await text_to_data(message.prompt, params, client)

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
