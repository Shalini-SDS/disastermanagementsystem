# Disaster Management System - Integration Guide

## Project Overview

This is a real-time disaster management training system with integrated frontend and backend components. The system tracks trainee locations in real-time, manages training sessions, and provides alerts for emergency scenarios.

## Architecture

### Backend (Python Flask)
- **Framework**: Flask with Flask-CORS and Flask-SocketIO
- **Database**: MongoDB
- **Real-time Communication**: WebSockets (Socket.IO)
- **Authentication**: JWT-like token system with bcrypt password hashing

### Frontend (React + TypeScript)
- **Framework**: React 18 with Vite
- **Real-time Updates**: Socket.IO Client
- **UI Components**: Radix UI + TailwindCSS
- **Routing**: React Router v7
- **Notifications**: Sonner Toast

## Quick Start

### 1. Backend Setup

#### Prerequisites
- Python 3.8+
- MongoDB (running locally or connection string configured)
- pip

#### Installation
```bash
cd backend

# Create and activate virtual environment (if not done)
python -m venv venv
.\venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Create demo data (optional)
python seed_demo_data.py

# Start the server
python app.py
```

The backend will start on `http://127.0.0.1:5000`

### 2. Frontend Setup

#### Prerequisites
- Node.js 18+
- npm or yarn

#### Installation
```bash
cd frontend/ui

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173` (or similar)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/logout` - Logout user

### Users
- `POST /api/users` - Create new user
- `GET /api/users/<role>` - Get all users by role
- `GET /api/user/<id>` - Get specific user

### Sessions
- `POST /api/sessions` - Create training session
- `GET /api/sessions` - Get all sessions
- `GET /api/sessions/<trainer_id>` - Get sessions by trainer

### Location Tracking
- `POST /api/track-location` - Track trainee location
- `POST /api/sync-data` - Sync location history

### Health Check
- `GET /health` - Check backend status
- `GET /` - API root endpoint

## WebSocket Events

### Client to Server
- `join_tracking_room` - Join location tracking for a trainee
- `leave_tracking_room` - Leave tracking room
- `location_update` - Send location update
- `session_alert` - Send session alert
- `heartbeat` - Send heartbeat to keep connection alive

### Server to Client
- `location_update` - Receive real-time location update
- `alert` - Receive session alert
- `heartbeat_ack` - Acknowledge heartbeat
- `status` - Connection status update

## Demo Credentials

### Trainers
- Email: `trainer@disaster.gov`
- Email: `sarah.johnson@disaster.gov`
- Password: `password123`

### Trainees
- Email: `alex.martin@rescue.com`
- Email: `jordan.lee@rescue.com`
- Email: `casey.wilson@rescue.com`
- Email: `morgan.taylor@rescue.com`
- Password: `password123`

## Features Implemented

### ✅ Authentication
- Login/Logout functionality
- Role-based access (Trainer/Trainee)
- Secure password hashing

### ✅ Real-time Location Tracking
- GPS-based location tracking
- Live updates via WebSockets
- Location history and syncing
- Accuracy and satellite information display

### ✅ Session Management
- Create and manage training sessions
- Assign trainees to sessions
- Session status tracking

### ✅ Real-time Alerts
- Emergency notifications
- Warning messages
- Info notifications

### ✅ User Management
- Create users with roles
- Fetch users by role
- User profiles

## Usage Guide

### For Trainers
1. Navigate to `/trainer/login`
2. Login with trainer credentials
3. Access dashboard to:
   - View all active sessions
   - Monitor trainee locations in real-time
   - Send alerts to trainees
   - View session reports

### For Trainees
1. Navigate to `/trainee/login`
2. Login with trainee credentials
3. Access home page and:
   - View location tracking status
   - Start/stop location tracking
   - Receive alerts from trainers
   - View emergency procedures

## File Structure

```
disastermanagementsystem/
├── backend/
│   ├── app.py                 # Main Flask app
│   ├── config.py              # Configuration
│   ├── requirements.txt        # Python dependencies
│   ├── seed_demo_data.py       # Demo data generation
│   ├── routes/
│   │   ├── auth_routes.py      # Authentication endpoints
│   │   ├── user_routes.py      # User management endpoints
│   │   ├── session_routes.py   # Session management endpoints
│   │   └── tracking_routes.py  # Location tracking endpoints
│   ├── models/
│   │   ├── user_model.py       # User database model
│   │   └── session_model.py    # Session database model
│   └── utils/
│       ├── response.py         # Response formatting
│       └── socketio_handlers.py # WebSocket handlers
│
└── frontend/ui/
    ├── src/
    │   ├── App.tsx                    # Main app component
    │   ├── routes.ts                  # Route definitions
    │   ├── services/
    │   │   ├── api.ts                # API service
    │   │   └── socket.ts             # WebSocket service
    │   ├── hooks/
    │   │   ├── useAuth.ts            # Authentication hook
    │   │   ├── useLocationTracking.ts # Location tracking hook
    │   │   └── useRealtimeLocation.ts # Real-time location hook
    │   └── components/
    │       ├── trainer/
    │       │   ├── TrainerLogin.tsx
    │       │   ├── TrainerDashboard.tsx
    │       │   └── ...
    │       └── trainee/
    │           ├── TraineeLogin.tsx
    │           ├── TraineeLocation.tsx
    │           └── ...
    ├── package.json
    └── vite.config.ts
```

## Troubleshooting

### Backend Connection Issues
- Ensure MongoDB is running
- Check if port 5000 is available
- Verify CORS is enabled for frontend URL

### Location Tracking Not Working
- Check browser geolocation permissions
- Ensure WebSocket connection is established
- Verify GPS signal (if on physical device)

### Real-time Updates Not Showing
- Confirm WebSocket connection is active
- Check browser console for errors
- Verify Socket.IO events are being triggered

## Environment Configuration

Create a `.env` file in the backend directory:
```
FLASK_ENV=development
MONGO_URI=mongodb://localhost:27017/disaster_management
SECRET_KEY=your_secret_key_here
PORT=5000
```

## API Testing

Use the provided API endpoints with curl or Postman:

```bash
# Login
curl -X POST http://127.0.0.1:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"trainer@disaster.gov","password":"password123"}'

# Track location
curl -X POST http://127.0.0.1:5000/api/track-location \
  -H "Content-Type: application/json" \
  -d '{"trainee_id":"<trainee_id>","latitude":40.7128,"longitude":-74.0060}'
```

## Performance Considerations

- Real-time updates are throttled to prevent excessive WebSocket messages
- Location history is limited to recent entries for database efficiency
- Session data is cached on the frontend for faster access

## Security Notes

- Passwords are hashed using bcrypt
- All API requests should use HTTPS in production
- WebSocket connections should be secured with WSS
- Implement JWT tokens for production use
- Add rate limiting to API endpoints

## Future Enhancements

- [ ] User authentication with JWT
- [ ] Advanced session analytics
- [ ] Mobile app support
- [ ] Offline mode with data sync
- [ ] Advanced geofencing
- [ ] Video streaming integration
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

## Support & Troubleshooting

For issues:
1. Check backend logs: Look at Flask console output
2. Check frontend console: Press F12 in browser
3. Verify MongoDB connection
4. Ensure all dependencies are installed
5. Clear browser cache and reload

---

**Last Updated**: February 4, 2026
**Version**: 1.0.0
