from flask import Blueprint, request
from config import db
from utils.response import api_response
from datetime import datetime

tracking_bp = Blueprint('tracking', __name__)

@tracking_bp.route('/track-location', methods=['POST'])
def track_location():
    data = request.get_json()
    trainee_id = data.get('trainee_id')
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    synced = data.get('synced', True)

    if not all([trainee_id, latitude is not None, longitude is not None]):
        return api_response(False, "Trainee ID and coordinates are required", status_code=400)

    log_data = {
        "trainee_id": trainee_id,
        "latitude": latitude,
        "longitude": longitude,
        "timestamp": datetime.utcnow(),
        "synced": synced
    }
    
    db.tracking_logs.insert_one(log_data)
    return api_response(True, "Location tracked successfully")

@tracking_bp.route('/sync-data', methods=['POST'])
def sync_data():
    data = request.get_json()
    logs = data.get('logs', []) # Array of tracking logs

    if not logs:
        return api_response(True, "No data to sync", [])

    synced_count = 0
    for log in logs:
        log['timestamp'] = datetime.utcnow() # Update timestamp to sync time or use provided one
        log['synced'] = True
        db.tracking_logs.insert_one(log)
        synced_count += 1
    
    return api_response(True, f"Synced {synced_count} records successfully")
