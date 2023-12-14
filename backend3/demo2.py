from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport

# Select your transport with a defined url endpoint
transport = AIOHTTPTransport(url="https://eth.blockscout.com/api/v1/graphql")

# Create a GraphQL client using the defined transport
client = Client(transport=transport, fetch_schema_from_transport=True)

# Provide a GraphQL query
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

eth_address = "0xdAC17F958D2ee523a2206206994597C13D831ec7"

# Execute the query on the transport
result = client.execute(query, variable_values={"eth_address": eth_address})
print(result)