from flask_socketio import emit, join_room, leave_room, rooms
from datetime import datetime

def register_socketio_handlers(socketio):
    """Register WebSocket event handlers for real-time communication"""

    @socketio.on('connect')
    def handle_connect():
        """Handle client connection"""
        print(f'Client connected')
        emit('connection_response', {'data': 'Connected to server'})

    @socketio.on('disconnect')
    def handle_disconnect():
        """Handle client disconnection"""
        print(f'Client disconnected')

    @socketio.on('join_tracking_room')
    def on_join(data):
        """Join a tracking room to receive location updates"""
        trainee_id = data.get('trainee_id')
        session_id = data.get('session_id')
        
        if trainee_id:
            room = f'trainee_{trainee_id}'
            join_room(room)
            emit('status', {
                'msg': f'Joined tracking room for trainee {trainee_id}',
                'timestamp': datetime.utcnow().isoformat()
            })
            print(f'Client joined room: {room}')

    @socketio.on('leave_tracking_room')
    def on_leave(data):
        """Leave a tracking room"""
        trainee_id = data.get('trainee_id')
        
        if trainee_id:
            room = f'trainee_{trainee_id}'
            leave_room(room)
            emit('status', {
                'msg': f'Left tracking room for trainee {trainee_id}',
                'timestamp': datetime.utcnow().isoformat()
            })
            print(f'Client left room: {room}')

    @socketio.on('location_update')
    def handle_location_update(data):
        """Broadcast location update to all clients tracking this trainee"""
        trainee_id = data.get('trainee_id')
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        accuracy = data.get('accuracy')
        timestamp = data.get('timestamp', datetime.utcnow().isoformat())
        
        if trainee_id:
            room = f'trainee_{trainee_id}'
            location_data = {
                'trainee_id': trainee_id,
                'latitude': latitude,
                'longitude': longitude,
                'accuracy': accuracy,
                'timestamp': timestamp
            }
            # Broadcast to all clients in this trainee's room
            emit('location_update', location_data, room=room)
            print(f'Location update for {trainee_id}: ({latitude}, {longitude})')

    @socketio.on('session_alert')
    def handle_session_alert(data):
        """Send alerts to session participants"""
        session_id = data.get('session_id')
        alert_type = data.get('type')  # 'emergency', 'warning', 'info'
        message = data.get('message')
        trainee_id = data.get('trainee_id')
        
        alert_data = {
            'session_id': session_id,
            'type': alert_type,
            'message': message,
            'trainee_id': trainee_id,
            'timestamp': datetime.utcnow().isoformat()
        }
        
        if session_id:
            room = f'session_{session_id}'
            emit('alert', alert_data, room=room)
            print(f'Alert sent to session {session_id}: {message}')

    @socketio.on('heartbeat')
    def handle_heartbeat(data):
        """Handle heartbeat from client to keep connection alive"""
        trainee_id = data.get('trainee_id')
        emit('heartbeat_ack', {
            'timestamp': datetime.utcnow().isoformat(),
            'trainee_id': trainee_id
        })
