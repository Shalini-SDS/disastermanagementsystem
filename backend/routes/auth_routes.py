from flask import Blueprint, request
from models.user_model import UserModel
from utils.response import api_response
import bcrypt

# Define the blueprint for authentication
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Handle user login by checking email and hashed password
    """
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Validate input
    if not email or not password:
        return api_response(False, "Email and password are required", status_code=400)

    # Find user in the database
    user = UserModel.find_by_email(email)
    
    # Check if user exists and password is correct
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return api_response(True, "Login successful", {
            "user_id": str(user['_id']),
            "role": user['role']
        })
    
    return api_response(False, "Invalid email or password", status_code=401)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    """
    Handle user registration by creating a new user with a hashed password
    """
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    role = data.get('role', 'volunteer') # Default role

    if not email or not password or not name:
        return api_response(False, "Name, email and password are required", status_code=400)

    if UserModel.find_by_email(email):
        return api_response(False, "User with this email already exists", status_code=400)

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    user_data = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "role": role
    }

    result = UserModel.create_user(user_data)
    
    if result.inserted_id:
        return api_response(True, "User created successfully", {
            "user_id": str(result.inserted_id),
            "role": role
        })

    return api_response(False, "Failed to create user", status_code=500)

@auth_bp.route('/logout', methods=['POST'])
def logout():
    """
    Handle user logout
    """
    # For this project, a simple success response is enough
    return api_response(True, "Logout successful")
