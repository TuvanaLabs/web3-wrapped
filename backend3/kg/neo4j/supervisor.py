import threading
import time
from bolt_sips import BoltSips  # Assuming BoltSips is a Python module you have
from kg.neo4j.client import Neo4jClient  # Assuming Neo4jClient is a Python class you have


class Neo4jSupervisor:
    def __init__(self):
        self.children = [
            BoltSips,  # Assuming this is a callable object that starts a service
            Neo4jClient  # Assuming this initializes a client connection
        ]
        self.threads = []

    def start(self):
        for child in self.children:
            thread = threading.Thread(target=self.run_child, args=(child,))
            thread.start()
            self.threads.append(thread)

    def run_child(self, child_callable):
        while True:
            try:
                child_callable()
            except Exception as e:
                print(f"Restarting {child_callable} due to error: {e}")
            time.sleep(1)  # Delay before restarting the service

# Usage example
# supervisor = Neo4jSupervisor()
# supervisor.start()
