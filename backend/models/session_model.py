from config import get_database
from bson import ObjectId

class SessionModel:
    @staticmethod
    def _get_collection():
        """Get sessions collection from MongoDB"""
        return get_database()['sessions']

    @staticmethod
    def create_session(data):
        return SessionModel._get_collection().insert_one(data)

    @staticmethod
    def get_all_sessions():
        return list(SessionModel._get_collection().find())

    @staticmethod
    def get_sessions_by_trainer(trainer_id):
        return list(SessionModel._get_collection().find({"trainer_id": trainer_id}))

    @staticmethod
    def find_by_id(session_id):
        try:
            return SessionModel._get_collection().find_one({"_id": ObjectId(session_id)})
        except:
            return None

    @staticmethod
    def get_session_by_id(session_id):
        """Get session by ID (used for QR verification)"""
        try:
            # Try to parse as ObjectId if it looks like one
            try:
                obj_id = ObjectId(session_id)
                return SessionModel._get_collection().find_one({"_id": obj_id})
            except:
                # If not a valid ObjectId, try as string
                return SessionModel._get_collection().find_one({"_id": session_id})
        except:
            return None
