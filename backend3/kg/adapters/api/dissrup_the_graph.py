import requests
import logging
from decimal import Decimal
from typing import List, Dict, Any, Optional

from ...transaction import Transaction
from ...address import Address


class DissrupTheGraphAPI:
    def __init__(self, api_url: str, api_timeout: int):
        self.api_url = api_url
        self.api_timeout = api_timeout

    def address_information(self, eth_address: str) -> Address:
        # As per the Elixir implementation, it seems to return a default Address
        return Address(eth_address, False)

    def transactions_for_address(self, eth_address: str) -> Address:
        query = """
            query($eth_address: Bytes!) {
              account(id: $eth_address) {
                sales(first: 1000) {
                  price
                  transaction {
                    id
                  }
                  asset {
                    assetId
                    contractAddress
                    contractType
                    URI
                  }
                  buyer {
                    address
                  }
                }
                buys(first: 1000) {
                  price
                  seller {
                    address
                  }
                  transaction {
                    id
                  }
                  asset {
                    assetId
                    contractAddress
                    contractType
                    URI
                  }
                }
              }
            }
        """
        variables = {"eth_address": eth_address}
        response = requests.post(self.api_url, json={"query": query, "variables": variables}, timeout=self.api_timeout)
        return self.parse_transactions(response.json(), eth_address)

    def wei_to_eth(self, value: int) -> str:
        return str(Decimal(value) / Decimal(10 ** 18))

    def parse_transactions(self, response: Dict[str, Any], eth_address: str) -> Address:
        if 'data' in response and 'account' in response['data']:
            sales = response["data"]["account"]["sales"] or []
            buys = response["data"]["account"]["buys"] or []

            sales_transactions = [self.create_transaction(tx, eth_address, "sale") for tx in sales]
            buys_transactions = [self.create_transaction(tx, eth_address, "buy") for tx in buys]

            transactions = sales_transactions + buys_transactions
            return Address(eth_address, False, transactions)
        else:
            logging.warning(f"Failed ETH transactions for {eth_address}")
            return Address(eth_address, False, [])

    def create_transaction(self, tx_data: Dict[str, Any], eth_address: str, tx_type: str) -> Transaction:
        if tx_type == "sale":
            return Transaction(
                hash=tx_data["transaction"]["id"],
                to_address=tx_data["buyer"]["address"],
                from_address=eth_address,
                value=self.wei_to_eth(tx_data["price"]),
                status="OK"
            )
        else:  # tx_type == "buy"
            return Transaction(
                hash=tx_data["transaction"]["id"],
                to_address=eth_address,
                from_address=tx_data["seller"]["address"],
                value=self.wei_to_eth(tx_data["price"]),
                status="OK"
            )

# Example usage
# api = DissrupTheGraphAPI(api_url='YOUR_API_URL', api_timeout=30)
# address_info = api.transactions_for_address('0xSOMEETHADDRESS')
# print(address_info)
