from llama_index.llms import OpenAI

llm = OpenAI(
    system_prompt="You are a data analyst specializing in web3, blockchain and cryptocurrencies. Use the data you are provided in the prompt to answer the user's question.",
)


def analyze(question: str, data) -> str:
    prompt = f"""
    QUESTION:
    {question}
    
    DATA:
    {data}
    
    HINT:
    1. The data always contains what is necessary to answer the question.
    2. If the data contains empty fields or arrays, consider them to be zero-values.
    3. Do not interpret them as non-existent values.
    """

    # print(prompt)
    return llm.complete(prompt).text
