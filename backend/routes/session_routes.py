from flask import Blueprint, request
from models.session_model import SessionModel
from utils.response import api_response

session_bp = Blueprint('sessions', __name__)

@session_bp.route('/sessions', methods=['POST'])
def create_session():
    data = request.get_json()
    session_name = data.get('session_name')
    trainer_id = data.get('trainer_id')
    trainee_ids = data.get('trainee_ids', []) # Array of trainee IDs
    status = data.get('status', 'active')

    if not session_name or not trainer_id:
        return api_response(False, "Session name and trainer ID are required", status_code=400)

    session_data = {
        "session_name": session_name,
        "trainer_id": trainer_id,
        "trainee_ids": trainee_ids,
        "status": status
    }
    
    result = SessionModel.create_session(session_data)
    return api_response(True, "Session created successfully", {"session_id": str(result.inserted_id)}, status_code=201)

@session_bp.route('/sessions', methods=['GET'])
def get_all_sessions():
    sessions = SessionModel.get_all_sessions()
    for session in sessions:
        session['_id'] = str(session['_id'])
    
    return api_response(True, "All sessions fetched", sessions)

@session_bp.route('/sessions/<trainer_id>', methods=['GET'])
def get_sessions_by_trainer(trainer_id):
    sessions = SessionModel.get_sessions_by_trainer(trainer_id)
    for session in sessions:
        session['_id'] = str(session['_id'])
    
    return api_response(True, f"Sessions for trainer {trainer_id} fetched", sessions)
