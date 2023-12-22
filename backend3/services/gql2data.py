import logging

from gql import gql
from gql.transport.aiohttp import log as aiohttp_logger
from fastapi import HTTPException

logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)
aiohttp_logger.setLevel(logging.ERROR)


async def execute_query(session, query: gql, params: dict) -> dict:
    try:
        return await session.execute(query, variable_values=params)
    except Exception as e:
        logger.error(f"Error executing query: {e}")
        raise HTTPException(status_code=500, detail=str(e))


async def run_queries(blockchain_address: str, queries: dict, gql_clients) -> dict:
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
