from flask import Blueprint, request
from models.user_model import UserModel
from utils.response import api_response
import bcrypt
from bson import ObjectId

user_bp = Blueprint('users', __name__)

@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    if not all([name, email, password, role]):
        return api_response(False, "All fields are required", status_code=400)

    if UserModel.find_by_email(email):
        return api_response(False, "User already exists", status_code=400)

    # Hash password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    user_data = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "role": role
    }
    
    result = UserModel.create_user(user_data)
    return api_response(True, "User created successfully", {"user_id": str(result.inserted_id)}, status_code=201)

@user_bp.route('/users/<role>', methods=['GET'])
def get_users_by_role(role):
    users = UserModel.find_by_role(role)
    for user in users:
        user['_id'] = str(user['_id'])
        del user['password'] # Don't return password
    
    return api_response(True, f"Users with role {role} fetched", users)

@user_bp.route('/user/<id>', methods=['GET'])
def get_user_by_id(id):
    user = UserModel.find_by_id(id)
    if user:
        user['_id'] = str(user['_id'])
        del user['password']
        return api_response(True, "User fetched successfully", user)
    
    return api_response(False, "User not found", status_code=404)
