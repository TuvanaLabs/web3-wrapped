def prepared_statement(query_string: str, variables: dict = None) -> str:
    if variables is None:
        variables = {}

    prepared_vars = {key: (value.replace("'", "\\'") if value is not None else "")
                     for key, value in variables.items()}

    for key, var in prepared_vars.items():
        query_string = query_string.replace(f"{{{{{key}}}}}", var)

    return query_string

# Usage example:
# query = "MATCH (n) WHERE n.name = '{{name}}' RETURN n"
# vars = {'name': "O'Reilly"}
# prepared_query = prepared_statement(query, vars)
# print(prepared_query)
