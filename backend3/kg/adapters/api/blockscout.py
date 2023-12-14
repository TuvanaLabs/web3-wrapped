import logging
from decimal import Decimal
from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport


class BlockscoutAPI:
    def __init__(self, api_url, api_timeout):
        self.api_url = api_url
        self.api_timeout = api_timeout
        self.client = None

    def initial_setup(self):
        transport = AIOHTTPTransport(
            url=self.api_url,
            # timeout=self.api_timeout,
            # headers={
            #     "Content-Type": "application/json",
                # "Authorization": "Bearer 5bc178f1-27a9-4dc1-89aa-541dd6f32269"
            # }
        )
        self.client = Client(transport=transport, fetch_schema_from_transport=True)
        return "ok"

    def address_information(self, eth_address):
        query = gql("""
            query($eth_address: AddressHash!) {
                address(hash: $eth_address) {
                    contractCode
                }
            }
        """)
        response = self.client.execute(query, variable_values={"eth_address": eth_address})
        return self.final_node_type(response, eth_address)

    def transactions_for_address(self, eth_address):
        query = gql("""
            query($eth_address: AddressHash!) {
                address(hash: $eth_address) {
                    contractCode
                    transactions(last: 2, count: 2) {
                        edges {
                            node {
                                hash
                                toAddressHash
                                fromAddressHash
                                value
                                status
                            }
                        }
                    }
                }
            }
        """)
        response = self.client.execute(query, variable_values={"eth_address": eth_address})
        return self.parse_transactions(response, eth_address)

    def wei_to_eth(self, value):
        return str(Decimal(value) / Decimal(10 ** 18))

    def final_node_type(self, response, eth_address):
        try:
            contract_code = bool(response["address"]["contractCode"])
            return {"eth_address": eth_address, "contract": contract_code, "transactions": []}
        except Exception as e:
            logging.warning(f"Failed to obtain address type for {eth_address}: {e}")
            return {"eth_address": eth_address, "contract": False, "transactions": []}

    def parse_transactions(self, response, eth_address):
        try:
            transactions_data = response["address"]["transactions"]["edges"] or []
            contract_code = bool(response["address"]["contractCode"])

            transactions = [
                {
                    "hash": tx["node"]["hash"],
                    "to_address": tx["node"]["toAddressHash"],
                    "from_address": tx["node"]["fromAddressHash"],
                    "value": self.wei_to_eth(tx["node"]["value"]),
                    "status": tx["node"]["status"]
                } for tx in transactions_data
            ]

            return {"eth_address": eth_address, "contract": contract_code, "transactions": transactions}
        except Exception as e:
            logging.warning(f"Failed ETH transactions for {eth_address}: {e}")
            return {"eth_address": eth_address, "contract": False, "transactions": []}


# Usage
api = BlockscoutAPI("https://eth.blockscout.com/api/v1/graphql", 9999999)
api.initial_setup()
info = api.address_information("0xdfd5293d8e347dfe59e90efd55b2956a1343963d")
transactions = api.transactions_for_address("0xdAC17F958D2ee523a2206206994597C13D831ec7")
