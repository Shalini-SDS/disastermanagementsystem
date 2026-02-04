# MongoDB Setup Guide for Disaster Management System

## Quick Setup

### Option 1: Local MongoDB Installation (Recommended for Development)

#### Windows
1. Download MongoDB Community Edition from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the installation wizard
3. MongoDB should start automatically as a service
4. Verify installation: Open Command Prompt and run:
   ```bash
   mongod --version
   ```

#### macOS
```bash
# Install via Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify
mongosh
```

#### Linux (Ubuntu)
```bash
# Import the public key
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
```

### Option 2: MongoDB Atlas (Cloud) - Recommended for Production

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)
5. Update `backend/config.py`:
   ```python
   MONGO_URI = 'mongodb+srv://username:password@cluster.mongodb.net/disaster_management'
   ```

### Option 3: Docker (If Docker is installed)

```bash
# Pull MongoDB image
docker pull mongo:latest

# Run MongoDB container
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Verify connection
docker logs mongodb
```

## Database Setup

### 1. Connect to MongoDB

**Local Connection:**
```bash
# Using mongosh (MongoDB Shell)
mongosh mongodb://localhost:27017/disaster_management
```

**Atlas Connection:**
```bash
mongosh "mongodb+srv://username:password@cluster.mongodb.net/disaster_management"
```

### 2. Create Database Collections

The system will automatically create collections when data is inserted. However, you can manually create them:

```bash
# Connect to database
use disaster_management

# Create collections
db.createCollection("users")
db.createCollection("sessions")
db.createCollection("tracking_logs")
```

### 3. Create Indexes (for performance)

```bash
# Connect to database
use disaster_management

# User indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })

# Session indexes
db.sessions.createIndex({ trainer_id: 1 })
db.sessions.createIndex({ status: 1 })
db.sessions.createIndex({ created_at: -1 })

# Tracking indexes
db.tracking_logs.createIndex({ trainee_id: 1 })
db.tracking_logs.createIndex({ timestamp: -1 })
db.tracking_logs.createIndex({ synced: 1 })
```

### 4. Seed Demo Data

From the backend directory:
```bash
python seed_demo_data.py
```

This will create:
- 2 trainer accounts
- 4 trainee accounts
- 2 training sessions with trainees assigned

## Database Schema

### Users Collection

```json
{
  "_id": ObjectId("..."),
  "name": "John Trainer",
  "email": "trainer@disaster.gov",
  "password": "<bcrypt_hash>",
  "role": "trainer"
}
```

**Fields:**
- `_id`: Unique MongoDB ID
- `name`: User's full name
- `email`: Unique email address
- `password`: Bcrypt hashed password
- `role`: "trainer" or "trainee"

### Sessions Collection

```json
{
  "_id": ObjectId("..."),
  "session_name": "Flood Response Training - Zone A",
  "trainer_id": "ObjectId(...)",
  "trainee_ids": ["ObjectId(...)", "ObjectId(...)"],
  "status": "active",
  "disaster_type": "flood",
  "created_at": ISODate("2026-02-04T00:00:00Z")
}
```

**Fields:**
- `_id`: Unique MongoDB ID
- `session_name`: Name of the training session
- `trainer_id`: ID of the trainer conducting the session
- `trainee_ids`: Array of trainee IDs
- `status`: "active", "completed", or "paused"
- `disaster_type`: Type of disaster (flood, earthquake, etc.)
- `created_at`: Creation timestamp

### Tracking Logs Collection

```json
{
  "_id": ObjectId("..."),
  "trainee_id": "ObjectId(...)",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "timestamp": ISODate("2026-02-04T12:30:45Z"),
  "accuracy": 5.2,
  "synced": true
}
```

**Fields:**
- `_id`: Unique MongoDB ID
- `trainee_id`: ID of the trainee
- `latitude`: GPS latitude coordinate
- `longitude`: GPS longitude coordinate
- `timestamp`: When the location was recorded
- `accuracy`: GPS accuracy in meters
- `synced`: Whether the data has been synced with server

## Verification

### Check MongoDB Service Status

**Windows:**
```bash
# Check if service is running
sc query MongoDB

# Start/Stop service
net start MongoDB
net stop MongoDB
```

**macOS:**
```bash
# Check status
brew services list

# Start/Stop
brew services start mongodb-community
brew services stop mongodb-community
```

**Linux:**
```bash
# Check status
sudo systemctl status mongod

# Start/Stop
sudo systemctl start mongod
sudo systemctl stop mongod
```

### Test Connection from Python

Create a test script `test_db.py`:

```python
from pymongo import MongoClient

try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['disaster_management']
    
    # Check connection
    server_info = client.server_info()
    print("✓ MongoDB Connected!")
    print(f"Server Version: {server_info['version']}")
    
    # Check collections
    collections = db.list_collection_names()
    print(f"Collections: {collections}")
    
except Exception as e:
    print(f"✗ Connection Error: {e}")
```

Run it:
```bash
python test_db.py
```

## Backup and Restore

### Backup MongoDB

**Local:**
```bash
# Backup all databases
mongodump --out /path/to/backup

# Backup specific database
mongodump --db disaster_management --out /path/to/backup
```

**Atlas:**
- Use Atlas Backup feature in the web console
- Automatic backups available (free tier: 7 days, paid: up to 90 days)

### Restore MongoDB

**Local:**
```bash
# Restore all databases
mongorestore /path/to/backup

# Restore specific database
mongorestore --db disaster_management /path/to/backup/disaster_management
```

## Troubleshooting

### Error: "Address already in use"
```
Problem: Port 27017 already in use
Solution: 
  - Kill existing mongod process
  - Use different port: mongod --port 27018
  - Check what's using the port: lsof -i :27017 (macOS/Linux)
```

### Error: "Connection refused"
```
Problem: MongoDB service not running
Solution:
  - Start MongoDB service
  - Windows: net start MongoDB
  - macOS: brew services start mongodb-community
  - Linux: sudo systemctl start mongod
```

### Error: "Authentication failed"
```
Problem: Wrong username/password for Atlas
Solution:
  - Check connection string in config.py
  - Verify username and password
  - Ensure IP address is whitelisted (Atlas)
```

### Database is empty after backend starts
```
Problem: Collections exist but no demo data
Solution:
  - Run: python seed_demo_data.py
  - Or manually insert test data using mongosh
```

## Performance Tuning

### 1. Add Indexes
```bash
# Location tracking queries (most common)
db.tracking_logs.createIndex({ trainee_id: 1, timestamp: -1 })

# User lookups
db.users.createIndex({ email: 1 })
```

### 2. Enable Compression
```bash
# In MongoDB Atlas, compression is enabled by default

# For local MongoDB, add to mongod.conf:
compression:
  snappy: true
```

### 3. Query Optimization
```bash
# Check query performance
db.tracking_logs.find({...}).explain("executionStats")

# Create compound indexes for common queries
db.tracking_logs.createIndex({ trainee_id: 1, synced: 1, timestamp: -1 })
```

## Security

### 1. Change Default Port
```bash
# Start MongoDB on non-standard port
mongod --port 27018
```

### 2. Enable Authentication
```bash
# Create admin user
db.createUser({
  user: "admin",
  pwd: "secure_password",
  roles: ["root"]
})

# Start MongoDB with auth
mongod --auth
```

### 3. Use MongoDB Atlas (Recommended)
- Built-in authentication
- Automatic backups
- Network access controls
- Database activity monitoring

## Maintenance Tasks

### Daily Tasks
- Monitor disk usage
- Check for connection errors
- Verify backup completion

### Weekly Tasks
- Review query performance
- Check database size
- Optimize indexes

### Monthly Tasks
- Full backup verification
- Security audit
- Performance analysis

## Useful MongoDB Commands

```bash
# Connect to database
mongosh mongodb://localhost:27017/disaster_management

# View current database
db

# List all databases
show databases

# List collections
show collections

# View collection count
db.users.countDocuments()

# Find all documents
db.users.find()

# Find with filter
db.users.find({ role: "trainee" })

# View collection stats
db.users.stats()

# Drop collection
db.users.drop()

# Drop database
db.dropDatabase()
```

## Resources

- MongoDB Official Docs: https://docs.mongodb.com/
- MongoDB University: https://university.mongodb.com/
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- PyMongo Docs: https://pymongo.readthedocs.io/

---

**Last Updated**: February 4, 2026  
**MongoDB Version**: 4.4+  
**Recommended**: MongoDB Atlas for production use
