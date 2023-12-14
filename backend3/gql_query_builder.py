# apollo client:download-schema graphql_schema.json --endpoint=https://graphql.bitquery.io --header="X-API-KEY: BQYM5Cig6QY8Z63BRyHvOh8eI6ve2JXt"

from llama_hub.file.sdl.base import SDLReader
from llama_index.tools.ondemand_loader_tool import OnDemandLoaderTool

import json
from graphql import parse

import openai

openai.api_key = "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"

with open("schema/bitquery/v2.schema.graphql", "r") as f:
    txt = f.read()

ast = parse(txt)
# for d in ast.definitions:
#     print(d.kind)
#     # if d.kind in ["object_type_definition", "input_object_type_definition"]:
#     #     print(d.name.value)

query_root_node = next(
    (
        defn
        for defn in ast.definitions
        if defn.kind == "object_type_definition" and defn.name.value == "RootQuery"
    )
)
query_roots = [field.name.value for field in query_root_node.fields]
print(query_roots)

import logging
import os

from llama_index import (
    SimpleDirectoryReader,
    StorageContext,
    VectorStoreIndex,
    load_index_from_storage,
    ServiceContext,
)
from llama_index.llms import OpenAI


# STORAGE_DIR = "./storage"  # directory to cache the generated index
# DATA_DIR = "./schema"  # directory containing the documents to index
#
# service_context = ServiceContext.from_defaults(
#     llm=OpenAI(model="gpt-3.5-turbo")
# )
#
# """
# {
#   transactions(
#     txSender: ["0x38fa0eAF8C0954c83516951f52600fbc9C10a789"],
#     options: { limit: 5, sort: { field: "date", order: DESC } }
#   ) {
#     txHash
#     date
#     amount {
#       value
#       currency
#     }
#     gasValue {
#       value
#       currency
#     }
#   }
# }
# """
# def get_index():
#     logger = logging.getLogger("uvicorn")
#     # check if storage already exists
#     if not os.path.exists(STORAGE_DIR):
#         logger.info("Creating new index")
#         # load the documents and create the index
#         # documents = SimpleDirectoryReader(DATA_DIR).load_data()
#
#         documents = []
#         documents += SDLReader.load_data("./schema/v1.schema.graphql")
#         documents += SDLReader.load_data("./schema/v2.schema.graphql")
#
#         index = VectorStoreIndex.from_documents(documents, service_context=service_context)
#         # store it for later
#         index.storage_context.persist(STORAGE_DIR)
#         logger.info(f"Finished creating new index. Stored in {STORAGE_DIR}")
#     else:
#         # load the existing index
#         logger.info(f"Loading index from {STORAGE_DIR}...")
#         storage_context = StorageContext.from_defaults(persist_dir=STORAGE_DIR)
#         index = load_index_from_storage(storage_context, service_context=service_context)
#         logger.info(f"Finished loading index from {STORAGE_DIR}")
#     return index
#
# index = get_index()
# query_engine = index.as_query_engine()
# response = query_engine.query("Write a graphql query to retrieve the last 5 Ethereum transactions for 0x38fa0eAF8C0954c83516951f52600fbc9C10a789")
# print(response)


documentation_tool = OnDemandLoaderTool.from_defaults(
    SDLReader(),
    name="graphql_writer",
    description="""
        The GraphQL schema file is located at './schema/v2.schema.graphql', this is always the file argument.
        A tool for processing the Shopify GraphQL spec, and writing queries from the documentation.

        You should pass a query_str to this tool in the form of a request to write a GraphQL query.

        Examples:
            1] Number of transactions of an address
                INPUT:
                    file: './schema/v2.schema.graphql', query_str='Write a graphql query to get the number of transactions for 0x38fa0eAF8C0954c83516951f52600fbc9C10a789'
                OUTPUT:
```
query MyQuery {
  EVM(network: eth, dataset: archive) {
    Transactions(
      where: {Transaction: {From: {is: "0xBBDfc40Fdee73cB6B60d9c88f25641BF111aB8E0"}}, Block: {Time: {since: "2023-01-01T00:00:00Z"}}}
    ) {
      count(distinct: Transaction_Hash)
    }
  }
}
```
        """,
)

"""
more exampls if needed:

            2] Minted tokens of an address
                INPUT:
                    file: './schema/v2.schema.graphql', query_str='which tokens did 0xa6Cc3C2531FdaA6Ae1A3CA84c2855806728693e8 mint this year?'
                OUTPUT:
```
query MyQuery {
  EVM(network: eth, dataset: combined) {
    Transfers(
      where: {Transfer: {Sender: {is: "0x0000000000000000000000000000000000000000"}, Receiver: {is: "0xdBfd836c989E1FE9586cB0D1BFB35E7849Be23a5"}, Currency: {Fungible: true}}, Block: {Time: {after: "2023-12-01T00:00:00Z"}}}
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
                    file: './schema/v2.schema.graphql', query_str='Show me the NFTs held by 0xF9d5f52C5B854d52308C31c82D927CE81648D406'
                OUTPUT:
```
{
  EVM(network: eth, dataset: combined) {
    BalanceUpdates(
      limit: { count: 100 }
      orderBy: { descending: BalanceUpdate_Amount }
      where: {
        BalanceUpdate: {
          Address: { is: "0xaba7161a7fb69c88e16ed9f455ce62b791ee4d03" }
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
"""
# print(
#     documentation_tool(
#         "./schema/v2.schema.graphql",
#         query_str="Write a graphql query to retrieve the last 5 Ethereum transactions for 0x38fa0eAF8C0954c83516951f52600fbc9C10a789",
#     )
# )

# Create the Agent with access to our tools

from llama_index.llms import OpenAI
from llama_index.agent import OpenAIAgent


llm = OpenAI(model="gpt-4-1106-preview")

agent = OpenAIAgent.from_tools(
    [documentation_tool],
    llm=llm,
    system_prompt=f"""
    You are a specialized Agent with access to the a GraphQL API for querying blockchain data.
    Your job is to chat with users and help them run GraphQL queries, interpreting the results for the user

    For your convenience, the RootQuery objects are listed here.

    {query_roots}

    RootQuery is the schema's entry-point for queries. This acts as the public, top-level API from which all queries must start.

    You can use graphql_writer to query the schema and assist in writing queries.

    If the GraphQL you execute returns an error, either directly fix the query, or directly ask the graphql_writer questions about the schema instead of writing graphql queries.
    Then use that information to write the correct graphql query
    """,
    verbose=True,
    max_function_calls=20,
)
r = agent.chat("Write a graphql query to retrieve the last 5 Ethereum transactions for 0x38fa0eAF8C0954c83516951f52600fbc9C10a789")
print(r)
