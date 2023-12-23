mock = """
{
    "top_accounts_sent_to": {
        "ethereum": {
            "coinpath": [
                {
                    "receiver": {
                        "address": "0x00000000000001ad428e4906ae43d8f9852d0dd6",
                        "receiversCount": 255327
                    }
                },
                {
                    "receiver": {
                        "address": "0x824a30f2984f9013f2c8d0a29c0a3cc5fd5c0673",
                        "receiversCount": 1809
                    }
                },
                {
                    "receiver": {
                        "address": "0x000000000000ad05ccc4f10045630fb830b95127",
                        "receiversCount": 797
                    }
                }
            ]
        }
    },
    "top_accounts_received_from": {
        "ethereum": {
            "coinpath": [
                {
                    "sender": {
                        "address": "0x4585fe77225b41b697c938b018e2ac67ac5a20c0",
                        "sendersCount": 4659
                    }
                },
                {
                    "sender": {
                        "address": "0x5c95d4b1c3321cf898d25949f41d50be2db5bc1d",
                        "sendersCount": 363
                    }
                },
                {
                    "sender": {
                        "address": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
                        "sendersCount": 322
                    }
                }
            ]
        }
    },
    "largest_sends": {
        "EVM": {
            "Transfers": [
                {
                    "Transfer": {
                        "Amount": "1.000000000000000000",
                        "Currency": {
                            "Name": "Ethereum",
                            "SmartContract": "0x"
                        }
                    }
                },
                {
                    "Transfer": {
                        "Amount": "0.781600000000000000",
                        "Currency": {
                            "Name": "Ethereum",
                            "SmartContract": "0x"
                        }
                    }
                },
                {
                    "Transfer": {
                        "Amount": "0.700000000000000000",
                        "Currency": {
                            "Name": "Ethereum",
                            "SmartContract": "0x"
                        }
                    }
                },
                {
                    "Transfer": {
                        "Amount": "0.650000000000000000",
                        "Currency": {
                            "Name": "Ethereum",
                            "SmartContract": "0x"
                        }
                    }
                },
                {
                    "Transfer": {
                        "Amount": "0.540000000000000000",
                        "Currency": {
                            "Name": "Ethereum",
                            "SmartContract": "0x"
                        }
                    }
                }
            ]
        }
    },
    "largest_receives": {
        "EVM": {
            "Transfers": [
                {
                    "Transfer": {
                        "Amount": "0.999999999999999998",
                        "Currency": {
                            "Name": "Liquid staked Ether 2.0",
                            "SmartContract": "0xae7ab96520de3a18e5e111b5eaab095312d7fe84"
                        }
                    }
                },
                {
                    "Transfer": {
                        "Amount": "0.05694378",
                        "Currency": {
                            "Name": "Wrapped BTC",
                            "SmartContract": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"
                        }
                    }
                },
                {
                    "Transfer": {
                        "Amount": "0.699999999999999999",
                        "Currency": {
                            "Name": "Liquid staked Ether 2.0",
                            "SmartContract": "0xae7ab96520de3a18e5e111b5eaab095312d7fe84"
                        }
                    }
                },
                {
                    "Transfer": {
                        "Amount": "0.677098404254422912",
                        "Currency": {
                            "Name": "Ethereum",
                            "SmartContract": "0x"
                        }
                    }
                },
                {
                    "Transfer": {
                        "Amount": "0.649999999999999999",
                        "Currency": {
                            "Name": "Liquid staked Ether 2.0",
                            "SmartContract": "0xae7ab96520de3a18e5e111b5eaab095312d7fe84"
                        }
                    }
                }
            ]
        }
    },
    "largest_fee_paid": {
        "EVM": {
            "Calls": [
                {
                    "Fee": {
                        "SenderFee": "0.007767750000000000"
                    }
                }
            ]
        }
    },
    "most_used_dex": {
        "EVM": {
            "DEXTrades": [
                {
                    "Trade": {
                        "Dex": {
                            "ProtocolName": "blur_v1"
                        }
                    },
                    "count": "1"
                },
                {
                    "Trade": {
                        "Dex": {
                            "ProtocolName": "seaport_v1.4"
                        }
                    },
                    "count": "2"
                },
                {
                    "Trade": {
                        "Dex": {
                            "ProtocolName": "uniswap_v3"
                        }
                    },
                    "count": "6"
                },
                {
                    "Trade": {
                        "Dex": {
                            "ProtocolName": "balancer_v1"
                        }
                    },
                    "count": "1"
                },
                {
                    "Trade": {
                        "Dex": {
                            "ProtocolName": "uniswap_v2"
                        }
                    },
                    "count": "2"
                }
            ]
        }
    },
    "blocks_included_in": {
        "EVM": {
            "Transactions": [
                {
                    "count": "139"
                }
            ]
        }
    },
    "num_transactions": {
        "EVM": {
            "Transactions": [
                {
                    "count": "145"
                }
            ]
        }
    },
    "tokens_minted": {
        "EVM": {
            "Transfers": [
                {
                    "Transaction": {
                        "Hash": "0x0872d383cea00f8f00c5f546d2bc2b0080f20e4dcc963cdb749a6709335c0a15"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Liquid staked Ether 2.0"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x1e146c29ceb21299e59b09a491de6553de473b6d1a927f16bba4a5f396c6f278"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Liquid staked Ether 2.0"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0xa6000b1e7d3e86f1c1afcb53226d514b1f88503c320fdb04275c1569f305f11e"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": ""
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x0bd0324c12924cb39b9776845de2a2761b32eb4d1ac94ecb3e4cde021985e241"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Liquid staked Ether 2.0"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x27651059ae90fc389394f326cbc95a27e34a2307ba2dd72c3fb5883165b5dc1f"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Liquid staked Ether 2.0"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x480f3ee1a5ac44f533b1cc67acd2ce112a4193e8c572ad44a294eb85ade359fb"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Liquid staked Ether 2.0"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x935fac90e27adfc26db7426110cbf3d5ecc03cdb1e863f027c6b26877fb381d1"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Liquid staked Ether 2.0"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x920d651a653175efd8703dc711b51822dd3dfdd4cd065e446101d6916f729881"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Wrapped liquid staked Ether 2.0"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x22f52d2aeaaacba48553e073673d32a48c4f399bd423bf0fd5bb6a1e9ff77d8f"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Aave Ethereum Variable Debt GHO"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x22f52d2aeaaacba48553e073673d32a48c4f399bd423bf0fd5bb6a1e9ff77d8f"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Gho Token"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x15e18d71cfa69ec97fe6105781f18ff024116b1cfbed094874b96ad3da92aff6"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Aave Ethereum wstETH"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0xfd50e2b17ee6fd70144e2fbdb28aa74047bd2777beb789b7c66818622fd4e9b2"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Blur Pool"
                        }
                    },
                    "count": "1"
                }
            ]
        }
    },
    "tokens_burnt": {
        "EVM": {
            "Transfers": [
                {
                    "Transaction": {
                        "Hash": "0x147f4cbd4bfff40890307cc6b16adfc059e6c9348ad4b7058ccee8ee6b40e710"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Wrapped liquid staked Ether 2.0"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0xa793234937b3bb38b4e7faf805f18fe8b179434bf25fde24e4f51e12749d38f7"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Wrapped liquid staked Ether 2.0"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x7fdd0d660e5e562f8012d4c94e58a79ef7d31a9d4941fc11a23df33c04a25412"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Aave Ethereum Variable Debt GHO"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x804566eb2d054fac0765abee833c0b70e63cc7ee0f57c6d282192c536d9e1cc0"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "adidas Originals: Into the Metaverse"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x8f921382f4eba35d4d48cc566580d46a11a7acddd91142187f6a44424e3f2762"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "[ Ledger ] Market – Deadfellaz Nano X"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x51e055c0729bea515ce6d3d8a1206bac43819d4690650c551b16f0273f076949"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Aave Ethereum wstETH"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0xc0e8071dc36c2686d8ac5b201c7b2e5cb9a3f51b4cfc39545812b03dae43e2a5"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Blur Pool"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x1597217f4ba702feb568fe19c846b0a1ec2a2256dcb667698b7dedd69d3d3b81"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Blur Pool"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x81760d917a730222b556eb505f014f2d3700bd73fbceaff605539d5e314138b1"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Blur Pool"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0xac35900a497a46a4e8a4974fded57f2f77627937632bac9eddca1c752b1b556f"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Blur Pool"
                        }
                    },
                    "count": "1"
                }
            ]
        }
    },
    "nfts_minted": {
        "EVM": {
            "Transfers": [
                {
                    "Transaction": {
                        "Hash": "0x8e8c13879aa95e6791cec5bcb46964baa70f7b44e988a6f343d14def58981a20"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Raws x adidas | Through the Stripes"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0xffa179cdd67829002fe0442573dee7d5a02f634e9d209de90afb8879f1fe5781"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "The Creation of Self-Custody by Batist"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x8aa57043533c31b56f80cd686ecd75f1de53c965780235be8d0c48b33ecb741a"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Ledger x Deadfellaz - Proof of Redemption"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0xffec05821d1a8b8cfd994e778ad0ca9b048d09717af5e788146ffacbb808f5a0"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "BlurredApeYachtClub"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x7f7b00d29632dc86eb5925a164eb24b08cda3b797b7f72416d32ae8627faf38c"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Liquid staked Ether 2.0"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x3081fde98b17d15e578a20edd73f5d130d13deeabcfd534bf42f9803360aadc7"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Liquid staked Ether 2.0"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x491e15a76d8912f110523142f4453ebaf4c4d8aa8ff14a5e85e266524bbefe0d"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Liquid staked Ether 2.0"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x804566eb2d054fac0765abee833c0b70e63cc7ee0f57c6d282192c536d9e1cc0"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "ALTS by adidas"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0xeea8041065ddefedc5efc6d00e70c6906641dbdbdeef32feaab85666297062d4"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "ShapellaUpgrade"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x605181daf96a24c04a8b2d4e2ac1e15d40cc984950722c7ba6263775abc3c780"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Rabby Desktop Genesis"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x88502282ffa0035905f0ffa60a8932b0fa851577fd7429fe231dfad1299d48b3"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Inspired By Ledger"
                        }
                    },
                    "count": "2"
                },
                {
                    "Transaction": {
                        "Hash": "0x3a5b3219aefc5412f75b404f8f579ef7e4853d615a491bd0a7afe464749f6daa"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Inspired By Ledger"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x49794e7810ae32983cc6506a66586d87fb29d10bbc5c0f4fbfbff955bcf91f54"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Inspired By Ledger"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0xd782ded27759b5ca37f4ce9f9e6b6810a3832c972eab48a055df51ee554b1ee2"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Inspired By Ledger"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x0ab1eb32432ddeaf4a0c1736acac6a0aecdbca757a762697f1e6d8688cd97b76"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Inspired By Ledger"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0xd7bae3df0e21cd69b9cb80643b9d760c054d4d4daa164b47a44811aa51561650"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Inspired By Ledger"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x3f7d198c6401a6450fdb72235e3ad13261b7995f231540feba22d4ffa9f5e7e1"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Inspired By Ledger"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x3ae0f8ff20d83ca7af6c8a5d9f419e1bbc104510eed9eaea706bc09a071752a4"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Inspired By Ledger"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x783989d3a1271ded3ba80a4a191a33b6c79175396c54aefc31cacb47c26f7fa3"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Inspired By Ledger"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x62cfde99eeeeb190d5368627020a62b50e6b29cec56ed7fa7593ff8e28aed63b"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Inspired By Ledger"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x4143603fa774a53cde7b10062029cab3ded1e81c9a672102e90a9fbcf3a51dfd"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "Inspired By Ledger"
                        }
                    },
                    "count": "1"
                }
            ]
        }
    },
    "nfts_burnt": {
        "EVM": {
            "Transfers": [
                {
                    "Transaction": {
                        "Hash": "0x804566eb2d054fac0765abee833c0b70e63cc7ee0f57c6d282192c536d9e1cc0"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "adidas Originals: Into the Metaverse"
                        }
                    },
                    "count": "1"
                },
                {
                    "Transaction": {
                        "Hash": "0x8f921382f4eba35d4d48cc566580d46a11a7acddd91142187f6a44424e3f2762"
                    },
                    "Transfer": {
                        "Currency": {
                            "Name": "[ Ledger ] Market – Deadfellaz Nano X"
                        }
                    },
                    "count": "1"
                }
            ]
        }
    },
    "monthly_transactions_sent": {
        "EVM": {
            "Transactions": [
                {
                    "Block": {
                        "Date": "2023-01-01"
                    },
                    "count": "5"
                },
                {
                    "Block": {
                        "Date": "2023-02-01"
                    },
                    "count": "9"
                },
                {
                    "Block": {
                        "Date": "2023-03-01"
                    },
                    "count": "25"
                },
                {
                    "Block": {
                        "Date": "2023-04-01"
                    },
                    "count": "42"
                },
                {
                    "Block": {
                        "Date": "2023-05-01"
                    },
                    "count": "2"
                },
                {
                    "Block": {
                        "Date": "2023-06-01"
                    },
                    "count": "28"
                },
                {
                    "Block": {
                        "Date": "2023-07-01"
                    },
                    "count": "5"
                },
                {
                    "Block": {
                        "Date": "2023-08-01"
                    },
                    "count": "15"
                },
                {
                    "Block": {
                        "Date": "2023-09-01"
                    },
                    "count": "3"
                },
                {
                    "Block": {
                        "Date": "2023-11-01"
                    },
                    "count": "6"
                },
                {
                    "Block": {
                        "Date": "2023-12-01"
                    },
                    "count": "5"
                }
            ]
        }
    },
    "monthly_transactions_received": {
        "EVM": {
            "Transactions": [
                {
                    "Block": {
                        "Date": "2023-01-01"
                    },
                    "count": "3"
                },
                {
                    "Block": {
                        "Date": "2023-02-01"
                    },
                    "count": "2"
                },
                {
                    "Block": {
                        "Date": "2023-03-01"
                    },
                    "count": "1"
                },
                {
                    "Block": {
                        "Date": "2023-07-01"
                    },
                    "count": "1"
                },
                {
                    "Block": {
                        "Date": "2023-08-01"
                    },
                    "count": "2"
                },
                {
                    "Block": {
                        "Date": "2023-09-01"
                    },
                    "count": "1"
                },
                {
                    "Block": {
                        "Date": "2023-11-01"
                    },
                    "count": "1"
                }
            ]
        }
    }
}
"""
