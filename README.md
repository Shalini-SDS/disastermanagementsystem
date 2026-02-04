# Disaster Management Training System

A comprehensive real-time disaster management training platform with integrated location tracking, session management, and emergency alert systems.

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** with pip
- **Node.js 18+** with npm
- **MongoDB** running locally or accessible via connection string
- **Windows, macOS, or Linux**

### One-Click Start (Windows)

1. **Start Backend**: Double-click `start_backend.bat`
   - Backend will run on `http://127.0.0.1:5000`

2. **Start Frontend**: Double-click `start_frontend.bat`
   - Frontend will run on `http://localhost:5173`

3. **Open in Browser**: Navigate to `http://localhost:5173`

### Manual Start

#### Backend
```bash
cd backend

# Create virtual environment
python -m venv venv
.\venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Create demo data (optional)
python seed_demo_data.py

# Start server
python app.py
```

#### Frontend
```bash
cd frontend/ui

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📋 Demo Credentials

### Trainer Login
- **Email**: `trainer@disaster.gov`
- **Password**: `password123`
- **Role**: Trainer/Command Center
- **Features**: Monitor trainees, manage sessions, send alerts

### Trainee Login
- **Email**: `alex.martin@rescue.com`
- **Password**: `password123`
- **Role**: Trainee/Field Participant
- **Features**: Real-time location tracking, receive alerts, emergency procedures

Additional trainees:
- `jordan.lee@rescue.com`
- `casey.wilson@rescue.com`
- `morgan.taylor@rescue.com`

## ✨ Key Features

### 🔐 Authentication
- [x] Secure login/logout system
- [x] Role-based access control (Trainer/Trainee)
- [x] Bcrypt password hashing
- [x] Session persistence with localStorage

### 📍 Real-time Location Tracking
- [x] GPS-based location tracking
- [x] Live position updates via WebSockets
- [x] Location accuracy and satellite information
- [x] Location history and syncing
- [x] Zone-based tracking
- [x] Start/stop tracking controls

### 📡 Real-time Communication
- [x] WebSocket integration (Socket.IO)
- [x] Live location broadcasting
- [x] Emergency alerts system
- [x] Heartbeat keepalive mechanism
- [x] Connection status monitoring

### 👥 User Management
- [x] Create users with different roles
- [x] User profile management
- [x] User lookup by role
- [x] Trainee-trainer relationships

### 📅 Session Management
- [x] Create training sessions
- [x] Assign trainees to sessions
- [x] Session status tracking
- [x] Trainer session assignment

### 🚨 Alert System
- [x] Emergency notifications
- [x] Warning alerts
- [x] Info messages
- [x] Real-time alert delivery
- [x] Alert history tracking

### 📊 Monitoring & Dashboard
- [x] Trainer command center dashboard
- [x] Real-time location map
- [x] Trainee status monitoring
- [x] Session overview
- [x] Alert management

### 🎯 Trainee Interface
- [x] Location tracking display
- [x] GPS status information
- [x] Emergency contact system
- [x] Training session view
- [x] Profile management

## 🏗️ Architecture

### Technology Stack

**Backend**
- Flask 3.0+ - Web framework
- Flask-SocketIO - Real-time WebSocket communication
- Flask-CORS - Cross-origin resource sharing
- MongoDB - NoSQL database
- Bcrypt - Password hashing
- Python 3.9

**Frontend**
- React 18 - UI framework
- TypeScript - Type safety
- Vite - Build tool
- React Router 7 - Client-side routing
- Radix UI - Component library
- TailwindCSS - Styling
- Socket.IO Client - Real-time updates
- Sonner - Toast notifications
- Framer Motion - Animations

### System Components

```
Frontend (React)
    ├── Authentication (useAuth hook)
    ├── Location Tracking (useLocationTracking hook)
    ├── Real-time Updates (useRealtimeLocation hook)
    ├── API Integration (apiService)
    └── WebSocket Integration (socketService)
        │
        └─► Backend (Flask)
            ├── Authentication Routes (/api/auth)
            ├── User Management Routes (/api/users)
            ├── Session Management Routes (/api/sessions)
            ├── Location Tracking Routes (/api/track-location)
            ├── WebSocket Handlers
            └── Database (MongoDB)
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `POST /api/users` - Create user
- `GET /api/users/<role>` - Get users by role
- `GET /api/user/<id>` - Get specific user

### Sessions
- `POST /api/sessions` - Create session
- `GET /api/sessions` - Get all sessions
- `GET /api/sessions/<trainer_id>` - Get trainer sessions

### Location Tracking
- `POST /api/track-location` - Track location
- `POST /api/sync-data` - Sync location history

### Health
- `GET /health` - Backend health check
- `GET /` - API status

## 🔌 WebSocket Events

### Events Sent to Server
- `join_tracking_room` - Join location tracking
- `leave_tracking_room` - Leave tracking
- `location_update` - Send location
- `session_alert` - Send alert
- `heartbeat` - Keep connection alive

### Events Received from Server
- `location_update` - Real-time location update
- `alert` - Session alert/notification
- `heartbeat_ack` - Heartbeat acknowledgment
- `status` - Connection status

## 📁 Project Structure

```
disastermanagementsystem/
├── backend/                          # Python Flask backend
│   ├── app.py                       # Main application file
│   ├── config.py                    # Configuration settings
│   ├── requirements.txt              # Python dependencies
│   ├── seed_demo_data.py            # Demo data generator
│   ├── routes/                      # API route handlers
│   │   ├── auth_routes.py
│   │   ├── user_routes.py
│   │   ├── session_routes.py
│   │   └── tracking_routes.py
│   ├── models/                      # Database models
│   │   ├── user_model.py
│   │   └── session_model.py
│   ├── utils/                       # Utility functions
│   │   ├── response.py              # Response formatting
│   │   └── socketio_handlers.py     # WebSocket handlers
│   └── venv/                        # Virtual environment
│
├── frontend/ui/                      # React frontend
│   ├── src/
│   │   ├── App.tsx                  # Root component
│   │   ├── routes.ts                # Route definitions
│   │   ├── services/
│   │   │   ├── api.ts               # API client
│   │   │   └── socket.ts            # WebSocket client
│   │   ├── hooks/
│   │   │   ├── useAuth.ts           # Auth hook
│   │   │   ├── useLocationTracking.ts
│   │   │   └── useRealtimeLocation.ts
│   │   └── components/              # React components
│   │       ├── trainer/             # Trainer pages
│   │       └── trainee/             # Trainee pages
│   ├── package.json
│   └── vite.config.ts
│
├── INTEGRATION_GUIDE.md              # Detailed integration guide
├── README.md                         # This file
├── start_backend.bat                 # Backend startup (Windows)
└── start_frontend.bat                # Frontend startup (Windows)
```

## 🔧 Configuration

### Backend Configuration (`backend/config.py`)

```python
class Config:
    # Database
    MONGO_URI = 'mongodb://localhost:27017/disaster_management'
    
    # Server
    PORT = 5000
    DEBUG = True
    
    # Security
    SECRET_KEY = 'your-secret-key-here'
```

### Frontend Configuration (`frontend/ui/src/services/api.ts`)

```typescript
const API_BASE_URL = 'http://127.0.0.1:5000/api';
```

## 🚀 Usage Guide

### For Trainers

1. **Login**: Go to `/trainer/login`
   - Enter email and password
   
2. **Dashboard**: View all active training sessions
   - Monitor real-time trainee locations
   - View session details
   
3. **Monitoring**: Track individual trainees
   - See live location updates
   - Monitor GPS status
   
4. **Alerts**: Send alerts to trainees
   - Emergency alerts
   - Warning messages
   - Info notifications

5. **Reports**: View session reports and statistics

### For Trainees

1. **Login**: Go to `/trainee/login`
   - Enter email and password
   
2. **Home**: View training session information
   - Session details
   - Emergency procedures
   
3. **Location**: Enable location tracking
   - Start GPS tracking
   - Sync location with server
   - View current zone
   
4. **Emergency**: Access emergency features
   - Emergency alert button
   - Emergency contacts
   
5. **Profile**: Manage profile settings

## 🐛 Troubleshooting

### Backend Won't Start
```
Error: Port 5000 already in use
Solution: Kill the process using port 5000 or change PORT in config.py
```

### MongoDB Connection Error
```
Error: mongoDB connection refused
Solution: 
1. Ensure MongoDB is running: mongod
2. Check MONGO_URI in config.py
3. Verify MongoDB is accessible
```

### Location Tracking Not Working
```
Error: Geolocation permission denied
Solution:
1. Check browser permissions
2. Allow location access for the site
3. Use HTTPS in production
```

### WebSocket Connection Failed
```
Error: Connection failed at http://127.0.0.1:5000
Solution:
1. Verify backend is running
2. Check CORS settings in app.py
3. Verify socket.io_path is correct
```

### Frontend Won't Load
```
Error: Cannot find module
Solution:
1. Run: npm install
2. Clear node_modules: rm -rf node_modules
3. Reinstall: npm install
```

## 📊 Real-time Features Demo

### Location Tracking Flow
```
Trainee Device
    ↓
GPS Signal → Browser Geolocation API
    ↓
WebSocket Event (location_update)
    ↓
Backend (Socket.IO handler)
    ↓
Store in MongoDB
    ↓
Broadcast to Trainer
    ↓
Real-time Map Update
```

### Alert System Flow
```
Trainer Dashboard
    ↓
Create Alert
    ↓
WebSocket Event (session_alert)
    ↓
Backend (Socket.IO handler)
    ↓
Broadcast to Trainees
    ↓
Trainee Notification (Toast)
    ↓
Log in Alert History
```

## 🔒 Security Considerations

- ✅ Passwords hashed with bcrypt (cost factor: 10)
- ✅ CORS enabled for frontend communication
- ✅ API endpoints protected with validation
- ⚠️ **Production**: Implement JWT authentication
- ⚠️ **Production**: Use HTTPS/WSS for secure communication
- ⚠️ **Production**: Add rate limiting to API endpoints
- ⚠️ **Production**: Implement proper session management

## 📈 Performance Tips

1. **Location Updates**: Throttled to prevent excessive bandwidth
2. **WebSocket Rooms**: Used to broadcast only to relevant clients
3. **Database Indexing**: Add indexes to MongoDB collections for faster queries
4. **Caching**: Session data cached on frontend
5. **Compression**: Enable gzip compression in production

## 🔄 Development Workflow

```bash
# 1. Start backend
cd backend
.\venv\Scripts\activate
python app.py

# 2. In another terminal, start frontend
cd frontend/ui
npm run dev

# 3. Open browser to http://localhost:5173

# 4. Login with demo credentials

# 5. Test real-time features
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User login (trainer and trainee)
- [ ] Location tracking start/stop
- [ ] Real-time location updates
- [ ] Alert sending and receiving
- [ ] Session creation and management
- [ ] User profile viewing
- [ ] Logout functionality
- [ ] WebSocket reconnection
- [ ] Offline/online transitions

### API Testing with cURL

```bash
# Login
curl -X POST http://127.0.0.1:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"trainer@disaster.gov","password":"password123"}'

# Get users by role
curl http://127.0.0.1:5000/api/users/trainee

# Track location
curl -X POST http://127.0.0.1:5000/api/track-location \
  -H "Content-Type: application/json" \
  -d '{
    "trainee_id":"<id>",
    "latitude":40.7128,
    "longitude":-74.0060
  }'
```

## 📚 Documentation

- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Detailed integration guide
- [API Documentation](#api-endpoints) - API endpoint reference
- [WebSocket Guide](#websocket-events) - WebSocket event reference

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Authors

- Disaster Management Team
- Real-time Systems Development Team

## 📞 Support

For issues and support:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review console logs (F12 in browser)
3. Check backend logs in terminal
4. Verify MongoDB connection
5. Ensure all dependencies are installed

## 🗺️ Roadmap

### Current Version (1.0.0)
- [x] Authentication system
- [x] Real-time location tracking
- [x] WebSocket communication
- [x] Session management
- [x] Alert system
- [x] User management

### Future Enhancements (v2.0+)
- [ ] JWT token authentication
- [ ] Advanced geofencing
- [ ] Video streaming integration
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Offline mode
- [ ] Advanced mapping (Google Maps integration)
- [ ] Export reports (PDF/Excel)
- [ ] User activity logging

## 📅 Version History

**v1.0.0** - February 4, 2026
- Initial release with all core features
- Real-time location tracking
- WebSocket integration
- Session and user management

---

**Last Updated**: February 4, 2026  
**Status**: ✅ Ready for Deployment
