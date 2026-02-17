from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from config import Config, get_mongo_client, close_mongo_connection
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.session_routes import session_bp
from routes.tracking_routes import tracking_bp
from utils.response import api_response
from utils.socketio_handlers import register_socketio_handlers
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize the Flask application
app = Flask(__name__)

# Load configurations from the Config class
try:
    app.config.from_object(Config)
    logger.info(f"Configuration loaded. Running on port {Config.PORT}")
except ValueError as e:
    logger.error(f"Configuration error: {e}")
    raise

# Initialize MongoDB connection at startup
try:
    logger.info("Initializing MongoDB Atlas connection at startup...")
    get_mongo_client()
    logger.info("✓ MongoDB Atlas initialized successfully")
except Exception as e:
    logger.error(f"✗ Failed to initialize MongoDB Atlas: {e}")
    logger.error("Application will exit due to database connection failure")
    raise

# Enable Cross-Origin Resource Sharing (CORS) for frontend integration
CORS(app, supports_credentials=True)

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

# Health check endpoint to verify backend status (including MongoDB)
@app.route('/health', methods=['GET'])
def health_check():
    try:
        client = get_mongo_client()
        client.server_info()  # Verify MongoDB connection
        return api_response(True, "Backend running", {"status": "healthy", "database": "connected"})
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return api_response(False, "Backend unhealthy", {"status": "error", "database": "disconnected"}), 503

# Graceful shutdown handler
@app.teardown_appcontext
def shutdown_session(exception=None):
    """Close MongoDB connection on app shutdown"""
    close_mongo_connection()

if __name__ == '__main__':
    try:
        # Start the Flask development server with WebSocket support
        logger.info(f"🚀 Server starting on port {Config.PORT}...")
        logger.info(f"📡 Disaster Management System API running")
        socketio.run(app, host='0.0.0.0', port=Config.PORT, debug=Config.DEBUG, allow_unsafe_werkzeug=True)
    except KeyboardInterrupt:
        logger.info("🛑 Server shutting down...")
    finally:
        close_mongo_connection()
