from typing import Optional, List
from kg.transaction import Transaction  # Assuming Transaction is another class you have defined


class Address:
    def __init__(self, eth_address: Optional[str] = None, contract: Optional[bool] = None, transactions: Optional[List[Transaction]] = None):
        self.eth_address = eth_address
        self.contract = contract
        self.transactions = transactions

    def __repr__(self):
        return f"Address(eth_address={self.eth_address}, contract={self.contract}, transactions={self.transactions})"
