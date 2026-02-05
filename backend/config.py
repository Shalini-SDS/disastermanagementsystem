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
client = MongoClient(Config.MONGO_URI, serverSelectionTimeoutMS=5000)
try:
    # Try to get the database from the URI
    db = client.get_database()
except Exception:
    # Fallback to 'disaster_db' if no database is specified in URI
    db = client['disaster_db']

# Verify connection
try:
    client.server_info()
    print("Connected to MongoDB successfully")
except Exception as e:
    print(f"Warning: Could not connect to MongoDB. Make sure it is running at {Config.MONGO_URI}")
