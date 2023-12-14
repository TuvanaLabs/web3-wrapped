import requests
import json


class EnsHelpers:
    @staticmethod
    def check_for_ens(to_address: str, from_address: str) -> dict:
        query = """
            query($from_address: ID!, $to_address: ID!) {
              fromAddress: domains(where: {resolvedAddress: $from_address}) {
                name
              }
              toAddress: domains(where: {resolvedAddress: $to_address}) {
                name
              }
            }
        """
        variables = {'to_address': to_address, 'from_address': from_address}
        url = "https://api.thegraph.com/subgraphs/name/ensdomains/ens"
        response = requests.post(url, json={'query': query, 'variables': variables})

        if response.ok:
            return EnsHelpers.parse_ens_response(response.json())
        else:
            return {'to_ens': '', 'from_ens': ''}

    @staticmethod
    def parse_ens_response(response: dict) -> dict:
        body = response.get('data', {})
        to_ens = EnsHelpers.retrieve_ens_name(body.get("toAddress"))
        from_ens = EnsHelpers.retrieve_ens_name(body.get("fromAddress"))

        return {'to_ens': to_ens, 'from_ens': from_ens}

    @staticmethod
    def retrieve_ens_name(ens_info: list) -> str:
        if not ens_info or len(ens_info) == 0:
            return ""
        return ens_info[0].get("name", "")

# Usage example
# ens_helper = EnsHelpers()
# result = ens_helper.check_for_ens("some_to_address", "some_from_address")
# print(result)
