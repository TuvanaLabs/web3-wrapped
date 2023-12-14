import threading
from queue import Queue

from kg.core.address_explorer import AddressExplorer
from kg.core.network_explorer import NetworkExplorer


class DynamicSupervisor:
    def __init__(self):
        self.workers = []
        self.work_queue = Queue()

    def start_link(self, network_explorer):
        # Start the NetworkExplorer as an example
        network_explorer = NetworkExplorer()  # Assuming NetworkExplorer is a class you have defined
        self.start_child(network_explorer)

    def start_child(self, worker):
        thread = threading.Thread(target=worker.start)  # Assuming each worker has a start method
        thread.start()
        self.workers.append(thread)

    def start_address_explorer(self, eth_address, depth, api_handler):
        # Create an AddressExplorer instance and start it
        address_explorer = AddressExplorer(eth_address, depth, api_handler)  # Pass self for network exploration callbacks
        self.start_child(address_explorer)

    # Additional methods and cleanup logic as required

# Usage example
# supervisor = DynamicSupervisor()
# supervisor.start_link()
# supervisor.start_address_explorer('0xSOMEETHADDRESS', 3, api_handler)  # Assuming api_handler is defined
