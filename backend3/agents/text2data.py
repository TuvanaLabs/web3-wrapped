from gql import gql, Client
from agents.text2gql import text_to_graphql
from services.gql2data import execute_query
from fastapi import HTTPException


async def text_to_data(msg: str, params: dict, client: Client) -> str:
    error_msg = ""
    query = ""
    attempts = 0
    data = {}

    while attempts < 3:
        attempts += 1
        prompt = msg

        if error_msg != "":
            prompt = f"""
            The query you generated is invalid. Find the correct type definitions in the schema and try generating the GraphQL query again.
            
            ERROR:
            ```
            {error_msg}
            ```
            
            QUERY YOU GENERATED:
            ```
            {query}
            ```
            
            ORIGINAL TASK:
            '''
            {msg}
            '''
            """

        query = text_to_graphql(prompt)
        # print(f"GQL QUERY:\n{query}")
        error_msg = ""

        try:
            async with client as session:
                data = await execute_query(session, gql(query), params)
        except HTTPException as e:
            error_msg = e.detail

        # print(f"""
        # ----
        # attempt #{attempts}:
        # query:\n{query}\n
        # error:\n{error_msg}
        # ---
        # """)

    if len(error_msg) > 0:
        raise Exception(error_msg)

    # print(f"GQL RESULT:\n{data}")

    return data
