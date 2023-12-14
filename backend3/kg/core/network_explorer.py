import threading

class NetworkExplorer:
    def __init__(self, api_adapter, pool_size, dynamic_supervisor):
        self.api_adapter = api_adapter
        self.pool_size = pool_size
        self.dynamic_supervisor = dynamic_supervisor
        self.known = set()
        self.exploring = set()
        self.remaining = []
        self.processes_count = 0
        self.lock = threading.Lock()

    def explore(self, eth_address, depth):
        downcased_address = eth_address.lower()
        self.api_adapter.initial_setup()
        self.add_to_queue(downcased_address, depth)

    def run(self):
        while self.remaining or self.exploring:
            with self.lock:
                if self.remaining and self.processes_count < self.pool_size:
                    eth_address, depth = self.remaining.pop(0)
                    if eth_address not in self.known:
                        self.known.add(eth_address)
                        self.dynamic_supervisor.start_address_explorer(eth_address, depth, self.api_adapter)
                        self.exploring.add(eth_address)
                        self.processes_count += 1

    def visit_node(self, eth_address, depth):
        self.add_to_queue(eth_address, depth)

    def node_visited(self, eth_address):
        with self.lock:
            self.exploring.discard(eth_address)
            self.processes_count -= 1

    def add_to_queue(self, eth_address, depth):
        with self.lock:
            self.remaining.append((eth_address, depth))

    def start(self):
        thread = threading.Thread(target=self.run)
        thread.start()


