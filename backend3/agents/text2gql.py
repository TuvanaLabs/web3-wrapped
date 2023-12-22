import json

from llama_index import (
    VectorStoreIndex,
    download_loader,
    StorageContext,
    load_index_from_storage,
    SimpleDirectoryReader
)
from llama_index.agent import OpenAIAgent
from llama_index.chat_engine.types import AgentChatResponse
from llama_index.tools import QueryEngineTool, ToolMetadata

from dotenv import load_dotenv

load_dotenv()

STORAGE_DOCS = "../storage/docs"
STORAGE_SCHEMA = "../storage/v2_schema"

def load_docs_query_engine():
    try:
        docs_storage_context = StorageContext.from_defaults(
            persist_dir=STORAGE_DOCS
        )
        docs_index = load_index_from_storage(docs_storage_context)

        docs_index_loaded = True
    except:
        docs_index_loaded = False

    if not docs_index_loaded:
        # print("building docs index")
        SimpleWebPageReader = download_loader("SimpleWebPageReader")

        loader = SimpleWebPageReader()
        documents = loader.load_data(urls=[
            'https://docs.bitquery.io/docs/intro/',
            'https://docs.bitquery.io/docs/category/building-queries/',
            'https://docs.bitquery.io/docs/category/evm-based-schema/',
            'https://docs.bitquery.io/docs/category/examples/',
            # 'https://docs.bitquery.io/docs/category/use-cases/',
        ])

        docs_index = VectorStoreIndex.from_documents(documents)
        docs_index.storage_context.persist(persist_dir=STORAGE_DOCS)

    docs_query_engine = docs_index.as_query_engine()
    return docs_query_engine


def load_schema_query_engine():
    try:
        schema_storage_context = StorageContext.from_defaults(
            persist_dir=STORAGE_SCHEMA
        )
        schema_index = load_index_from_storage(schema_storage_context)

        schema_index_loaded = True
    except:
        schema_index_loaded = False

    if not schema_index_loaded:
        # print("building schema index")
        # load data
        v2_schema_doc = SimpleDirectoryReader(
            input_files=["schema/bitquery/v2.schema.graphql"]
        ).load_data()

        # build index
        schema_index = VectorStoreIndex.from_documents(v2_schema_doc)
        schema_index.storage_context.persist(persist_dir=STORAGE_SCHEMA)

    schema_query_engine = schema_index.as_query_engine()
    return schema_query_engine


docs_query_engine = load_docs_query_engine()
schema_query_engine = load_schema_query_engine()

# r = schema_query_engine.query(
#     "write a graphql query to answer the question: \'Show me the token transfers held by 0xF9d5f52C5B854d52308C31c82D927CE81648D406 since March 3rd this year\'"
# )
# print(r)

query_engine_tools = [
    QueryEngineTool(
        query_engine=docs_query_engine,
        metadata=ToolMetadata(
            name="graphql_examples_query_engine",
            description="useful for when you want to find examples of how graphql queries are used and how to build them",
        ),
    ),

    QueryEngineTool(
        query_engine=schema_query_engine,
        metadata=ToolMetadata(
            name="graphql_schema_query_engine",
            description="useful for when you want to find out the type definitions and valid schema of graphql queries",
        ),
    )
]

system_prompt = """
        You are an expert a converting natural language questions to GraphQL queries.
        You are provided with knowledge of BitQuery's v2 GraphQL schema.
        Your task is to respond to questions with a valid GraphQL query that answers any question asked.
        Do not guess. Do not use the V1 schema. Return only the graphql query. Do not send any extra text.

        EXAMPLES:
            1] Number of transactions of an address
                INPUT:
                    Write a graphql query to get the number of transactions for 0x38fa0eAF8C0954c83516951f52600fbc9C10a789
                OUTPUT:
```
query TransactionCountByAddress($blockchain_address: String!) { {
  EVM(network: eth, dataset: archive) {
    Transactions(
      where: {Transaction: {From: {is: $blockchain_address}}}
    ) {
      count(distinct: Transaction_Hash)
    }
  }
}
```

            2] Minted tokens of an address
                INPUT:
                    which tokens did 0xa6Cc3C2531FdaA6Ae1A3CA84c2855806728693e8 mint this year?
                OUTPUT:
```
query TokensMintedByAddress($blockchain_address: String!) {
  EVM(network: eth, dataset: combined) {
    Transfers(
      where: {Transfer: {Sender: {is: "0x0000000000000000000000000000000000000000"}, Receiver: {is: $blockchain_address}, Currency: {Fungible: true}}, Block: {Time: {after: "2023-12-01T00:00:00Z"}}}
      orderBy: {descending: Transfer_Currency_SmartContract}
    ) {
      Transaction {
        Hash
      }
      Transfer {
        Currency {
          Name
        }
      }
    }
  }
}
```
            3] NFTs of an address
                INPUT:
                    Show me the NFTs held by 0xF9d5f52C5B854d52308C31c82D927CE81648D406
                OUTPUT:
```
query NFTHoldings($blockchain_address: String!) {
  EVM(network: eth, dataset: combined) {
    BalanceUpdates(
      limit: { count: 100 }
      orderBy: { descending: BalanceUpdate_Amount }
      where: {
        BalanceUpdate: {
          Address: { is: $blockchain_address }
        }
        Currency: { Fungible: false }
      }
    ) {
      Currency {
        Fungible
        Symbol
        SmartContract
        Name
        HasURI
        Delegated
        Decimals
      }
      BalanceUpdate {
        Id
        Amount
        Address
        URI
      }
    }
  }
}
```

            4] Number of transactions of an address since a point in time
                INPUT:
                    Write a graphql query to get the number of transactions for 0x38fa0eAF8C0954c83516951f52600fbc9C10a789 since the beginning of 2023
                OUTPUT:
```
query TransactionCountByAddressFromSpecificDate($blockchain_address: String!) { {
  EVM(network: eth, dataset: archive) {
    Transactions(
      where: {Transaction: {From: {is: $blockchain_address}}, Block: {Time: {since: "2023-01-01T00:00:00Z"}}}
    ) {
      count(distinct: Transaction_Hash)
    }
  }
}
```
    """

agent = OpenAIAgent.from_tools(
    query_engine_tools,
    system_prompt=system_prompt,
    verbose=True,
)

# r = agent.chat(
#     'Show me the NFTs held by 0xF9d5f52C5B854d52308C31c82D927CE81648D406'
#     # 'Show me the token transfers performed by 0xF9d5f52C5B854d52308C31c82D927CE81648D406 since March 3rd this year'
# )
# print(r)


def text_to_graphql(msg: str) -> str:
    agent.reset()

    response: AgentChatResponse = agent.chat(msg)  # , tool_choice="graphql_examples_query_engine")
    query: AgentChatResponse = agent.chat(f"""
    Extract and return only the GraphQL query from below. Return only the Graphql Query. You must NOT include anything else when responding.:
    
    {response}
    """)
    result = query.response
        # print(len(result) > 0)

        # verified_query: AgentChatResponse = agent.chat(f"""
        #     Using the provided schema tool for seeing the valid and acceptable GraphQL schema, verify whether the query below is valid:
        #
        #     {result}
        #
        #     Respond this way:
        #     {{
        #         valid: boolean
        #         reason: string
        #     }}
        #     Do NOT respond in any other way.
        # """)
        #
        # r = json.loads(verified_query.response)
        #
        # valid = bool(r["valid"])
        # error_msg = r["reason"]
        # attempts += 1

    return result

# def validate_query(query: str)
