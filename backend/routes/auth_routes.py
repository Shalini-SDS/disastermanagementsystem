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

@auth_bp.route('/logout', methods=['POST'])
def logout():
    """
    Handle user logout
    """
    # For this project, a simple success response is enough
    return api_response(True, "Logout successful")
