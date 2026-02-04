from config import db
from bson import ObjectId

class UserModel:
    collection = db.users

    @staticmethod
    def create_user(data):
        return UserModel.collection.insert_one(data)

    @staticmethod
    def find_by_email(email):
        return UserModel.collection.find_one({"email": email})

    @staticmethod
    def find_by_role(role):
        return list(UserModel.collection.find({"role": role}))

    @staticmethod
    def find_by_id(user_id):
        try:
            return UserModel.collection.find_one({"_id": ObjectId(user_id)})
        except:
            return None
