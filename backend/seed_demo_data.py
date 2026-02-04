import bcrypt
from config import db
from bson import ObjectId
import os

def create_demo_data():
    """Create demo users and sessions for testing"""
    
    # Clear existing data (optional - comment out if you want to keep data)
    # db.users.delete_many({})
    # db.sessions.delete_many({})
    # db.tracking_logs.delete_many({})

    # Create demo trainers
    trainers = [
        {
            "name": "Commander John Smith",
            "email": "trainer@disaster.gov",
            "password": bcrypt.hashpw(b"password123", bcrypt.gensalt()),
            "role": "trainer"
        },
        {
            "name": "Dr. Sarah Johnson",
            "email": "sarah.johnson@disaster.gov",
            "password": bcrypt.hashpw(b"password123", bcrypt.gensalt()),
            "role": "trainer"
        }
    ]

    # Create demo trainees
    trainees = [
        {
            "name": "Alex Martin",
            "email": "alex.martin@rescue.com",
            "password": bcrypt.hashpw(b"password123", bcrypt.gensalt()),
            "role": "trainee"
        },
        {
            "name": "Jordan Lee",
            "email": "jordan.lee@rescue.com",
            "password": bcrypt.hashpw(b"password123", bcrypt.gensalt()),
            "role": "trainee"
        },
        {
            "name": "Casey Wilson",
            "email": "casey.wilson@rescue.com",
            "password": bcrypt.hashpw(b"password123", bcrypt.gensalt()),
            "role": "trainee"
        },
        {
            "name": "Morgan Taylor",
            "email": "morgan.taylor@rescue.com",
            "password": bcrypt.hashpw(b"password123", bcrypt.gensalt()),
            "role": "trainee"
        }
    ]

    # Insert users
    trainer_result = db.users.insert_many(trainers)
    trainee_result = db.users.insert_many(trainees)

    print(f"Created {len(trainer_result.inserted_ids)} trainers")
    print(f"Created {len(trainee_result.inserted_ids)} trainees")

    # Create demo sessions
    sessions = [
        {
            "session_name": "Flood Response Training - Zone A",
            "trainer_id": str(trainer_result.inserted_ids[0]),
            "trainee_ids": [str(trainee_result.inserted_ids[0]), str(trainee_result.inserted_ids[1])],
            "status": "active",
            "disaster_type": "flood",
            "created_at": __import__("datetime").datetime.utcnow()
        },
        {
            "session_name": "Earthquake Response Training - Zone B",
            "trainer_id": str(trainer_result.inserted_ids[1]),
            "trainee_ids": [str(trainee_result.inserted_ids[2]), str(trainee_result.inserted_ids[3])],
            "status": "active",
            "disaster_type": "earthquake",
            "created_at": __import__("datetime").datetime.utcnow()
        }
    ]

    session_result = db.sessions.insert_many(sessions)
    print(f"Created {len(session_result.inserted_ids)} sessions")

    print("\n=== Demo Credentials ===")
    print("\nTrainers:")
    for trainer in trainers:
        print(f"  Email: {trainer['email']}")
        print(f"  Password: password123\n")

    print("Trainees:")
    for trainee in trainees:
        print(f"  Email: {trainee['email']}")
        print(f"  Password: password123\n")

if __name__ == "__main__":
    create_demo_data()
