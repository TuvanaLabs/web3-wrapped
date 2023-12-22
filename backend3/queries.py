from gql import gql

all_queries = {
    "top_accounts_sent_to": {
        "query": gql("""
query TopAccountsSentTo($blockchain_address: String!) {
  ethereum {
    coinpath(
      sender: {is: $blockchain_address}
      options: {
        desc: "receiver.receiversCount",
        limit: 3
      },
      date: {since: "2023-01-01"}
    ) {
      receiver {
        address
        receiversCount
      }
    }
  }
}
    """),
        "schema_version": "v1"
    },

    "top_accounts_received_from": {
        "query": gql("""
query TopAccountsReceivedFrom($blockchain_address: String!) {
  ethereum {
    coinpath(
      options: {desc: "sender.sendersCount", limit: 3}
      receiver: {is: $blockchain_address}
      date: {since: "2023-01-01"}
    ) {
      sender {
        address
        sendersCount
      }
    }
  }
}

    """),
        "schema_version": "v1"
    },

#     "largest_sends": {
#         "query": gql("""
# query LargestSends($blockchain_address: String!) {
#   EVM(dataset: combined, network: eth) {
#     Transfers(
#       where: {
#         Transfer: {Sender: {is: $blockchain_address}},
#         Block: {Date: {since: "2023-01-01"}}
#       }
#       orderBy: {descending: Transaction_Value}
#       limit: {count: 3}
#     ) {
#       Transaction {
#         Hash
#         To
#         Value(maximum: Transaction_Value)
#       }
#     }
#   }
# }
#     """),
#         "schema_version": "v2"
#     },
#
#     "largest_receives": {
#         "query": gql("""
# query LargestReceives($blockchain_address: String!) {
#   EVM(dataset: combined, network: eth) {
#     Transfers(
#       where: {
#         Transfer: {Receiver: {is: $blockchain_address}},
#       	Block: {Date: {since: "2023-01-01"}}
#       }
#       orderBy: {descending: Transaction_Value}
#       limit: {count: 5}
#     ) {
#       Transfer {
#         Amount(maximum: Transfer_Amount)
#         Currency {
#           Name
#           SmartContract
#         }
#       }
#     }
#   }
# }
#     """),
#         "schema_version": "v2"
#     },

    "largest_fee_paid": {
        "query": gql("""
query LargestFeePaid($blockchain_address: String!) {
  EVM(dataset: combined, network: eth) {
    Calls(where: {
      Call: {From: {is: $blockchain_address}},
      Block: {Date: {since: "2023-01-01"}}
    }) {
      Fee {
        SenderFee(maximum: Call_Gas)
      }
    }
  }
}
    """),
        "schema_version": "v2"
    },

    "most_used_dex": {
        "query": gql("""
query MostUsedDEX($blockchain_address: String!) {
  EVM(network: eth, dataset: combined) {
    DEXTrades(
      where: {
        Transaction: {From: {is: $blockchain_address}},
      	Block: {Date: {since: "2023-01-01"}}
      }
      limit: {count: 5}
    ) {
      Trade {
        Dex {
          ProtocolName
        }
      }
      count(distinct: Trade_Dex_SmartContract)
    }
  }
}    
    """),
        "schema_version": "v2"
    },

    "blocks_included_in": {
        "query": gql("""
query BlocksIncludedIn($blockchain_address: String!) {
  EVM(network: eth, dataset: combined) {
    Transactions(
      where: {
        Transaction: {From: {is: $blockchain_address}}, 
        Block: {Time: {since: "2023-01-01T00:00:00Z"}},
      }
    ) {
      count(distinct: Block_Number)
    }
  }
}    
    """),
        "schema_version": "v2"
    },

    "num_transactions": {
        "query": gql("""
query NumberOfTransactions($blockchain_address: String!) {
  EVM(network: eth, dataset: archive) {
    Transactions(
      where: {
        Transaction: {From: {is: $blockchain_address}}, 
        Block: {Time: {since: "2023-01-01T00:00:00Z"}}
      }
    ) {
      count(distinct: Transaction_Hash)
    }
  }
}
    """),
        "schema_version": "v2"
    },

    "tokens_minted": {
        "query": gql("""
query TokensMinted($blockchain_address: String!) {
  EVM(network: eth, dataset: combined) {
    Transfers(
      where: {
        Transfer: {
          Sender: {is: "0x0000000000000000000000000000000000000000"}, 
          Receiver: {is: $blockchain_address}, 
          Currency: {Fungible: true}
        }, 
        Block: {Time: {since: "2023-01-01T00:00:00Z"}}}
      orderBy: {descending: Transfer_Currency_SmartContract}
    ) {
      Transaction {
        Hash
      }
      Transfer {
        Currency {
          Name
        }
      }
      count
    }
  }
}
    """),
        "schema_version": "v2"
    },

    "tokens_burnt": {
        "query": gql("""
query TokensBurned($blockchain_address: String!) {
  EVM(network: eth, dataset: combined) {
    Transfers(
      where: {
        Transfer: {Sender: {is: $blockchain_address}, Receiver: {is: "0x0000000000000000000000000000000000000000"}},
        Block: {Time: {since: "2023-01-01T00:00:00Z"}}
      }
      orderBy: {descending: Transfer_Currency_SmartContract}
    ) {
      Transaction {
        Hash
      }
      Transfer {
        Currency {
          Name
        }
      }
      count
    }
  }
}
    """),
        "schema_version": "v2"
    },

    "nfts_minted": {
        "query": gql("""
query NFTsMinted($blockchain_address: String!) {
  EVM(network: eth, dataset: combined) {
    Transfers(
      where: {
        Transfer: {Sender: {is: "0x0000000000000000000000000000000000000000"}, Receiver: {is: $blockchain_address}, Currency: {Fungible: false}},
        Block: {Time: {since: "2023-01-01T00:00:00Z"}}
      }
      orderBy: {descending: Transfer_Currency_SmartContract}
    ) {
      Transaction {
        Hash
      }
      Transfer {
        Currency {
          Name
        }
      }
      count
    }
  }
}
    """),
        "schema_version": "v2"
    },

    "nfts_burnt": {
        "query": gql("""
query NFTsBurned($blockchain_address: String!) {
  EVM(network: eth, dataset: combined) {
    Transfers(
      where: {
        Transfer: {Sender: {is: $blockchain_address}, Receiver: {is: "0x0000000000000000000000000000000000000000"}, Currency: {Fungible: false}}, 
        Block: {Time: {after: "2023-01-01T00:00:00Z"}}
      }
      orderBy: {descending: Transfer_Currency_SmartContract}
    ) {
      Transaction {
        Hash
      }
      Transfer {
        Currency {
          Name
        }
      }
      count
    }
  }
}
    """),
        "schema_version": "v2"
    },

    "monthly_transactions_sent": {
        "query": gql("""
query MonthlyTransactionsSent($blockchain_address: String!) {
  EVM(network: eth, dataset: combined) {
    Transactions(
      where: {
        Transaction: {From: {is: $blockchain_address}},
        Block: {Date: {since: "2023-01-01"}}
      }
    ) {
      count(distinct: Transaction_Hash)
      Block {
        Date(interval: {in: months})
      }
    }
  }
}
    """),
        "schema_version": "v2"
    },

    "monthly_transactions_received": {
        "query": gql("""
query MonthlyTransactionsReceived($blockchain_address: String!) {
  EVM(network: eth, dataset: combined) {
    Transactions(
      where: {
        Transaction: {To: {is: $blockchain_address}},
        Block: {Date: {since: "2023-01-01"}}
      }
    ) {
      count(distinct: Transaction_Hash)
      Block {
        Date(interval: {in: months})
      }
    }
  }
}
    """),
        "schema_version": "v2"
    },
}

sample_prompt_queries = {
    "account_stats": {
        "query": gql("""
query getStats($blockchain_address: String!) {
  ethereum(network: ethereum) {
    addressStats(address: {is: $blockchain_address}) {
      address {
        callTxCount
        calledTxCount
        receiveFromCount
        receiveFromCurrencies
        receiveTxCount
        sendToCurrencies
        sendTxCount
        sendToCount
        sendAmount
        daysWithTransfers
        daysWithTransactions
        daysWithSent
        daysWithReceived
        receiveAmount
        balance
        otherTxCount
        feeAmount
        lastTxAt {
          dayOfMonth
          month
          year
        }
        lastTransferAt {
          dayOfMonth
          month
          year
        }
        firstTxAt {
          year
          month
          dayOfMonth
        }
        firstTransferAt {
          year
          month
          dayOfMonth
        }
      }
    }
  }
}
"""),
        "schema_version": "v1"
    },

    "dex_trades": {
        "query": gql("""
query getDEXTrades($blockchain_address: String!) {
  ethereum(network: ethereum) {
    dexTrades(
      options: {desc: "block.height", limit: 10}
      makerOrTaker: {is: $blockchain_address}
      date: {since: "2023-01-01"}
    ) {
      transaction {
        hash
      }
      smartContract {
        address {
          address
        }
        contractType
        currency {
          name
        }
      }
      tradeIndex
      date {
        date
      }
      block {
        height
      }
      buyAmount
      buyAmountInUsd: buyAmount(in: USD)
      buyCurrency {
        symbol
        address
        name
      }
      sellAmount
      sellAmountInUsd: sellAmount(in: USD)
      sellCurrency {
        symbol
        address
      }
      sellAmountInUsd: sellAmount(in: USD)
      tradeAmount(in: USD)
      transaction {
        hash
      }
    }
  }
}
"""),
        "schema_version": "v1"
    },

    "age_of_wallet": {
        "query": gql("""
query WalletAge($blockchain_address: String!) {
  EVM(network: eth, dataset: combined) {
    BalanceUpdates(
      where: {BalanceUpdate: {Address: {is: $blockchain_address}}}
    ) {
      Block {
        first: Time(minimum: Block_Date)
        last: Time(maximum: Block_Date)
      }
    }
  }
}
"""),
        "schema_version": "v2"
    },

    "number_failed_transactions": {
        "query": gql("""
query NumberOfFailedTransactions($blockchain_address: String!) {
  ethereum {
    transactions(
      success: false
      txSender: {is: $blockchain_address}
      date: {since: "2023-01-01"}
    ) {
      count
    }
  }
}
"""),
        "schema_version": "v1"
    }
}
