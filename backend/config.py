import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables from .env file
load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/disaster_db")
    SECRET_KEY = os.getenv("SECRET_KEY", "secret_key")
    PORT = int(os.getenv("PORT", 5000))

# Initialize MongoDB client
client = MongoClient(Config.MONGO_URI)
db = client.get_database() # Uses database name from URI or default
