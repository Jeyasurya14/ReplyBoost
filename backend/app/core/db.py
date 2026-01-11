from pymongo import MongoClient
import os
from dotenv import load_dotenv
import certifi

load_dotenv()

MONGO_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")

# Use certifi to provide robust SSL certificate handling for Render/Cloud
client = MongoClient(MONGO_URL, tlsCAFile=certifi.where())
db = client.replyboost
