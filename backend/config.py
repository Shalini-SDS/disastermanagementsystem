import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError, OperationFailure
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

class Config:
    """Production-ready MongoDB Atlas configuration"""
    
    # MongoDB Atlas URI (required)
    MONGO_URI = os.getenv("MONGO_URI")
    
    # Validate MongoDB Atlas URI is set
    if not MONGO_URI:
        raise ValueError(
            "MONGO_URI environment variable is not set. "
            "Please set it to your MongoDB Atlas connection string: "
            "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"
        )
    
    if not MONGO_URI.startswith("mongodb+srv://"):
        raise ValueError(
            "Invalid MongoDB URI. Must use MongoDB Atlas (mongodb+srv://) connection string. "
            "Get it from: https://cloud.mongodb.com → Connect → Drivers"
        )
    
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    PORT = int(os.getenv("PORT", 5000))
    DEBUG = os.getenv("DEBUG", "False").lower() == "true"
    
    # MongoDB connection pool settings (production-ready)
    MONGO_OPTIONS = {
        "serverSelectionTimeoutMS": 5000,       # 5 seconds to find a server
        "connectTimeoutMS": 5000,               # 5 seconds to connect
        "socketTimeoutMS": 5000,                # 5 seconds for socket operations
        "retryWrites": True,                    # Enable retryable writes
        "w": "majority",                        # Write concern
        "maxPoolSize": 50,                      # Connection pool size
        "minPoolSize": 10,                      # Minimum connections
        "maxIdleTimeMS": 45000,                 # Close idle connections after 45s
        "waitQueueTimeoutMS": 5000,             # Wait 5s for connection from pool
        "ssl": True,                            # SSL/TLS enabled for Atlas
    }


# MongoDB Client (singleton pattern - connection reuse)
_mongo_client = None
_db = None


def get_mongo_client():
    """
    Get or create MongoDB client (singleton).
    Uses connection pooling for production efficiency.
    """
    global _mongo_client
    if _mongo_client is None:
        try:
            logger.info("Initializing MongoDB Atlas connection...")
            _mongo_client = MongoClient(Config.MONGO_URI, **Config.MONGO_OPTIONS)
            
            # Verify connection immediately
            _mongo_client.server_info()
            logger.info("✓ Connected to MongoDB Atlas successfully")
            
        except ServerSelectionTimeoutError as e:
            logger.error("✗ MongoDB Atlas connection timeout - Server unreachable")
            logger.error(f"  Ensure: 1) IP is whitelisted in Atlas, 2) Network is connected, 3) URI is correct")
            logger.error(f"  Error: {e}")
            raise
        except OperationFailure as e:
            logger.error("✗ MongoDB Atlas authentication failed")
            logger.error(f"  Check username/password in MONGO_URI")
            logger.error(f"  Error: {e}")
            raise
        except Exception as e:
            logger.error(f"✗ MongoDB Atlas connection failed: {e}")
            raise
    
    return _mongo_client


def get_database():
    """
    Get MongoDB database instance.
    Returns the default database from the connection URI.
    """
    global _db
    if _db is None:
        client = get_mongo_client()
        _db = client.get_default_database()
    return _db


def close_mongo_connection():
    """Close MongoDB connection (call on app shutdown)"""
    global _mongo_client, _db
    if _mongo_client:
        _mongo_client.close()
        logger.info("MongoDB Atlas connection closed")
        _mongo_client = None
        _db = None
    return None
