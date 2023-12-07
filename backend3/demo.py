import requests
import json

url = "https://graphql.bitquery.io"

payload = json.dumps({
   "query": "{\n  ethereum(network: ethereum) {\n    addressStats(\n      address: {is: \"0xA7EFAe728D2936e78BDA97dc267687568dD593f3\"}\n    ) {\n      address {\n        callTxCount\n        calledTxCount\n        receiveFromCount\n        receiveFromCurrencies\n        receiveTxCount\n        sendToCurrencies\n        sendTxCount\n        sendToCount\n        sendAmount\n        daysWithTransfers\n        daysWithTransactions\n        daysWithSent\n        daysWithReceived\n      }\n    }\n    dexTrades(\n      options: {desc: \"block.height\", limit: 10}\n      makerOrTaker: {is: \"0xA7EFAe728D2936e78BDA97dc267687568dD593f3\"}\n      date: {after: \"2021-04-28\"}\n    ) {\n      transaction {\n        hash\n      }\n      smartContract {\n        address {\n          address\n        }\n        contractType\n        currency {\n          name\n        }\n      }\n      tradeIndex\n      date {\n        date\n      }\n      block {\n        height\n      }\n      buyAmount\n      buyAmountInUsd: buyAmount(in: USD)\n      buyCurrency {\n        symbol\n        address\n      }\n      sellAmount\n      sellAmountInUsd: sellAmount(in: USD)\n      sellCurrency {\n        symbol\n        address\n      }\n      sellAmountInUsd: sellAmount(in: USD)\n      tradeAmount(in: USD)\n      transaction {\n        gasValue\n        gasPrice\n        gas\n      }\n    }\n  }\n}\n",
   "variables": "{}"
})
headers = {
   'Content-Type': 'application/json',
   'X-API-KEY': 'BQYM5Cig6QY8Z63BRyHvOh8eI6ve2JXt'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
