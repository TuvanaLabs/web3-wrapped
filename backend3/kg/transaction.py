class Transaction:
    def __init__(self, hash: str, to_address: str, from_address: str, value: str, status: str):
        self.hash = hash
        self.to_address = to_address
        self.from_address = from_address
        self.value = value
        self.status = status

    def __repr__(self):
        return (f"Transaction(hash={self.hash}, to_address={self.to_address}, "
                f"from_address={self.from_address}, value={self.value}, status={self.status})")
