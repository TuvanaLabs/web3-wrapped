import threading
from kg.neo4j.supervisor import Neo4jSupervisor  # Assuming you have a Neo4jSupervisor class
from dynamic_supervisor import DynamicSupervisor  # Assuming you have a DynamicSupervisor class


class Application:
    def __init__(self):
        self.neo4j_supervisor = Neo4jSupervisor()
        self.dynamic_supervisor = DynamicSupervisor()

    def start(self):
        # Start Neo4j Supervisor
        neo4j_thread = threading.Thread(target=self.neo4j_supervisor.start)
        neo4j_thread.start()

        # Start Dynamic Supervisor
        dynamic_thread = threading.Thread(target=self.dynamic_supervisor.start_link)
        dynamic_thread.start()

        # Add additional initialization and management logic as needed


# Usage example
app = Application()
app.start()
