from kg.core.dynamic_supervisor import DynamicSupervisor
from kg.adapters.api.blockscout import BlockscoutAPI
from kg.core.network_explorer import NetworkExplorer


api_adapter = BlockscoutAPI("https://eth.blockscout.com/api/v1/graphql", 999999)
pool_size = 10
dynamic_supervisor = DynamicSupervisor()
network_explorer = NetworkExplorer(api_adapter, pool_size, dynamic_supervisor)
# network_explorer.start()
network_explorer.explore('0x38fa0eAF8C0954c83516951f52600fbc9C10a789', 2)
