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
    """

    # print(prompt)
    return llm.complete(prompt).text
