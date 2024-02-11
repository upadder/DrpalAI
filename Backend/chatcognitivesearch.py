# import os
# #responsible for creating embeddings in vector store
# # from langchain_openai import AzureOpenAIEmbeddings
# import openai
# # from langchain.embeddings.openai import OpenAIEmbeddings
# from langchain_openai import OpenAIEmbeddings
# from langchain_community.vectorstores.azuresearch import AzureSearch
# from langchain_community.document_loaders import AzureBlobStorageContainerLoader
# #container we will use to store our container data 
# from langchain.text_splitter import CharacterTextSplitter
# #create chunks from txt file

# from dotenv import load_dotenv

# load_dotenv()
# # os.environ["AZURE_OPENAI_API_KEY"] = os.getenv("AZURE_OPENAI_API_KEY")
# # os.environ["AZURE_OPENAI_ENDPOINT"] = os.getenv("AZURE_OPENAI_ENDPOINT")

# vector_store_address: str = f"https://{os.environ.get('AZURE_COGNITIVE_SEARCH_SERVICE_NAME')}.search.windows.net"

# openai_api_key = os.environ.get("OPENAI_API_KEY")
# # embeddings = AzureOpenAIEmbeddings(
# #     azure_deployment="embeddingmodel",  # Replace with your actual deployment name
# #     openai_api_version="2023-05-15",  # Specify the API version you are using
# # )
# model: str = "text-embedding-ada-002"
# embeddings: OpenAIEmbeddings = OpenAIEmbeddings(deployment=model, chunk_size=1)

# index_name: str = "langchain-vector-stonybrook"

# vector_store: AzureSearch = AzureSearch(
#     azure_search_endpoint=vector_store_address,
#     azure_search_key=os.environ.get("AZURE_COGNITIVE_SEARCH_API_KEY"),
#     index_name=index_name,
#     embedding_function=embeddings.embed_query,
# )


# loader = AzureBlobStorageContainerLoader(
#     conn_str=os.environ.get("AZURE_CONN_STRING"),
#     container=os.environ.get("CONTAINER_NAME"),
# )

# documents = loader.load()
# text_splitter = CharacterTextSplitter(chunk_size=150, chunk_overlap=20)
# docs = text_splitter.split_documents(documents)
# print(docs)
# vector_store.add_documents(documents=docs)
# print("Data loaded into vectorstore successfully")

import os
from dotenv import load_dotenv
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores.azuresearch import AzureSearch
from langchain_community.document_loaders import AzureBlobStorageContainerLoader
from langchain.text_splitter import CharacterTextSplitter

# Load environment variables
load_dotenv()

# Configuration for Azure Cognitive Search
vector_store_address = f"https://{os.environ.get('AZURE_COGNITIVE_SEARCH_SERVICE_NAME')}.search.windows.net"
index_name = "langchain-chat-search"

# Initialize Hugging Face embeddings
# You can choose any model from Hugging Face that suits your needs. Here, 'sentence-transformers/all-MiniLM-L6-v2' is used as an example.
model_name = "sangmini/msmarco-cotmae-MiniLM-L12_en-ko-ja"
embeddings = HuggingFaceEmbeddings(model_name=model_name)

# Initialize AzureSearch with HuggingFaceEmbeddings
vector_store = AzureSearch(
    azure_search_endpoint=vector_store_address,
    azure_search_key=os.environ.get("AZURE_COGNITIVE_SEARCH_API_KEY"),
    index_name=index_name,
    embedding_function=embeddings.embed_query,  # Use the Hugging Face embedding function
)

# Initialize the document loader
loader = AzureBlobStorageContainerLoader(
    conn_str=os.environ.get("AZURE_CONN_STRING"),
    container=os.environ.get("CHAT_CONTAINER_NAME"),
)

# Load documents
documents = loader.load()

# Split documents into chunks
text_splitter = CharacterTextSplitter(chunk_size=150, chunk_overlap=20)
docs = text_splitter.split_documents(documents)

# Add documents to the vector store
vector_store.add_documents(documents=docs)

print("Data loaded into vector store successfully")
