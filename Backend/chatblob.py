from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
import os

connection_string = "DefaultEndpointsProtocol=https;AccountName=georgetownstorage;AccountKey=JL2LumNNUrYKbh/VojDLmO++hztTJTCSa6uh8fHCrUOzwAfE28a83wp2QHrccwDRH5Tpbr1WGeX1+AStZej/Ng==;EndpointSuffix=core.windows.net"  #
container_name = "chatdataelevance"
blob_name = "georgetownstorage"
directory_path = "ChatData"

blob_service_client = BlobServiceClient.from_connection_string(connection_string)

for root, dirs, files in os.walk(directory_path):
    for file in files:
        file_path = os.path.join(root, file)
        blob_name = os.path.relpath(file_path, directory_path)

        blob_client = blob_service_client.get_blob_client(
            container=container_name, blob=blob_name
        )

        with open(file_path, "rb") as data:
            blob_client.upload_blob(data,overwrite=True)

        print(f"date {file_path} uploaded {blob_name} hurray!")
