from flask import Blueprint, request
from models.session_model import SessionModel
from utils.response import api_response
import json

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

@session_bp.route('/sessions/verify-qr', methods=['POST'])
def verify_qr_code():
    """Verify QR code scanned by trainee"""
    try:
        data = request.get_json()
        qr_data = data.get('qrData')
        
        if not qr_data:
            return api_response(False, "QR code data is required", status_code=400)
        
        # Parse QR data if it's JSON
        session_id = None
        if isinstance(qr_data, dict) and 'session_id' in qr_data:
            session_id = qr_data.get('session_id')
        elif isinstance(qr_data, str):
            # Try to parse as JSON first
            try:
                parsed = json.loads(qr_data)
                session_id = parsed.get('session_id')
            except:
                # If not JSON, treat as session ID directly
                session_id = qr_data
        
        if not session_id:
            return api_response(False, "Invalid QR code format", status_code=400)
        
        # Verify session exists
        session = SessionModel.get_session_by_id(session_id)
        if not session:
            return api_response(False, "Session not found", status_code=404)
        
        # Check if session is active
        if session.get('status') != 'active':
            return api_response(False, "Session is not active", status_code=400)
        
        return api_response(
            True, 
            "QR code verified successfully", 
            {
                "session_id": str(session.get('_id')),
                "session_name": session.get('session_name'),
                "trainer_id": session.get('trainer_id')
            }
        )
    
    except Exception as e:
        return api_response(False, f"Error verifying QR code: {str(e)}", status_code=500)
