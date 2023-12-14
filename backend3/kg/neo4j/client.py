from typing import Any, Optional, List
import threading
from neo4j import GraphDatabase
from kg.address import Address
from kg.transaction import Transaction


class Neo4jClient:
    def __init__(self, uri: str, user: str, password: str):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))
        self.lock = threading.Lock()

    def close(self):
        self.driver.close()

    def execute_query(self, cypher: str, parameters: Optional[dict] = None):
        with self.lock:
            with self.driver.session() as session:
                session.write_transaction(lambda tx: tx.run(cypher, parameters))

    def clear_database(self):
        cypher = "MATCH (n) DETACH DELETE n"
        self.execute_query(cypher)

    def create_indexes(self):
        indexes = [
            "CREATE INDEX AccountAddressIndex IF NOT EXISTS FOR (a:Account) ON (a.eth_address)",
            "CREATE INDEX ContractAddressIndex IF NOT EXISTS FOR (a:SmartContract) ON (a.eth_address)",
            "CREATE INDEX TransactionHashIndex IF NOT EXISTS FOR ()-[s:TO]-() ON (s.hash)"
        ]
        for index_query in indexes:
            self.execute_query(index_query)

    def set_node_label(self, eth_address: str, new_label_string: str):
        downcased_address = eth_address.lower()
        cypher = """
          MATCH (n {eth_address: $eth_address})
          SET n:{label}
        """
        self.execute_query(cypher, {'eth_address': downcased_address, 'label': new_label_string})

    def highlight_accounts_of_interest(self, addresses: List[str]):
        for address in addresses:
            self.set_node_label(address.lower(), "Interest")

    def transaction_relation(self, address_info: Address, transaction: Transaction) -> str:
        cypher = """
        MERGE (from:Account {eth_address: $from_address})
        MERGE (to:Account {eth_address: $to_address})
        MERGE (from)-[t:TRANSACTION {hash: $hash}]->(to)
        SET t.value = $value, t.status = $status
        RETURN t
        """

        parameters = {
            "from_address": transaction.from_address,
            "to_address": transaction.to_address,
            "hash": transaction.hash,
            "value": transaction.value,
            "status": transaction.status
        }

        self.execute_query(cypher, parameters)
        return transaction.hash


# Usage example:
# client = Neo4jClient(uri="neo4j://localhost:7687", user="username", password="password")
# client.create_indexes()
# ... other operations ...
# client.close()
