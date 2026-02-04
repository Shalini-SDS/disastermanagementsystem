from config import db
from bson import ObjectId

class SessionModel:
    collection = db.sessions

    @staticmethod
    def create_session(data):
        return SessionModel.collection.insert_one(data)

    @staticmethod
    def get_all_sessions():
        return list(SessionModel.collection.find())

    @staticmethod
    def get_sessions_by_trainer(trainer_id):
        return list(SessionModel.collection.find({"trainer_id": trainer_id}))

    @staticmethod
    def find_by_id(session_id):
        try:
            return SessionModel.collection.find_one({"_id": ObjectId(session_id)})
        except:
            return None
