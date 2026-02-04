from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from config import Config
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.session_routes import session_bp
from routes.tracking_routes import tracking_bp
from utils.response import api_response
from utils.socketio_handlers import register_socketio_handlers

# Initialize the Flask application
app = Flask(__name__)
# Load configurations from the Config class
app.config.from_object(Config)

# Enable Cross-Origin Resource Sharing (CORS) for frontend integration
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize WebSocket support
socketio = SocketIO(app, cors_allowed_origins="*")

# Register WebSocket event handlers
register_socketio_handlers(socketio)

# Register blueprints (modular routes) for different parts of the application
# Auth routes for login and logout
app.register_blueprint(auth_bp, url_prefix='/api/auth')
# User routes for management
app.register_blueprint(user_bp, url_prefix='/api')
# Session routes for training sessions
app.register_blueprint(session_bp, url_prefix='/api')
# Tracking routes for location data and sync
app.register_blueprint(tracking_bp, url_prefix='/api')

# Root endpoint
@app.route('/', methods=['GET'])
def index():
    return api_response(True, "Disaster Management System API", {"version": "1.0", "status": "running"})

# Health check endpoint to verify backend status
@app.route('/health', methods=['GET'])
def health_check():
    return api_response(True, "Backend running", {"status": "healthy"})

if __name__ == '__main__':
    # Start the Flask development server with WebSocket support
    print(f"Server starting on port {Config.PORT}...")
    socketio.run(app, host='0.0.0.0', port=Config.PORT, debug=True, allow_unsafe_werkzeug=True)
