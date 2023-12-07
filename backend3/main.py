from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport

import uvicorn

# Select your transport with a defined url endpoint
transport = AIOHTTPTransport(
    url="https://graphql.bitquery.io",
    headers={
        "Content-Type": "application/json",
        "X-API-KEY": "BQYM5Cig6QY8Z63BRyHvOh8eI6ve2JXt"
    }
)

# Create a GraphQL client using the defined transport
client = Client(transport=transport, fetch_schema_from_transport=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/stats/{blockchain_id}")
def get_stats(blockchain_id: str, q: Union[str, None] = None):
    # print(blockchain_id)

    # Provide a GraphQL query
    query = gql(
        """
query getStats($blockchain_address: String!) {
  ethereum(network: ethereum) {
    addressStats(
      address: {is: $blockchain_address}
    ) {
      address {
        callTxCount
        calledTxCount
        receiveFromCount
        receiveFromCurrencies
        receiveTxCount
        sendToCurrencies
        sendTxCount
        sendToCount
        sendAmount
        daysWithTransfers
        daysWithTransactions
        daysWithSent
        daysWithReceived
      }
    }
    dexTrades(
      options: {desc: "block.height", limit: 10}
      makerOrTaker: {is: $blockchain_address}
      date: {after: "2022-12-31"}
    ) {
      transaction {
        hash
      }
      smartContract {
        address {
          address
        }
        contractType
        currency {
          name
        }
      }
      tradeIndex
      date {
        date
      }
      block {
        height
      }
      buyAmount
      buyAmountInUsd: buyAmount(in: USD)
      buyCurrency {
        symbol
        address
      }
      sellAmount
      sellAmountInUsd: sellAmount(in: USD)
      sellCurrency {
        symbol
        address
      }
      sellAmountInUsd: sellAmount(in: USD)
      tradeAmount(in: USD)
      transaction {
        gasValue
        gasPrice
        gas
      }
    }
  }
}
    """
    )

    params = {"blockchain_address": blockchain_id}

    # Execute the query on the transport
    result = client.execute(query, variable_values=params)
    # print(result)

    return result


# gql-cli https://graphql.bitquery.io --print-schema --schema-download input_value_deprecation:true > schema.graphql

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
