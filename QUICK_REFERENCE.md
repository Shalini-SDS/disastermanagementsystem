# Quick Reference Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Start Backend (Terminal 1)
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
pip install -r requirements.txt
python app.py
```
✅ Backend running on `http://127.0.0.1:5000`

### Step 2: Start Frontend (Terminal 2)
```bash
cd frontend/ui
npm install
npm run dev
```
✅ Frontend running on `http://localhost:5173`

### Step 3: Open Browser
Navigate to `http://localhost:5173`

### Step 4: Login
Use any of these demo accounts:
- **Trainer**: trainer@disaster.gov / password123
- **Trainee**: alex.martin@rescue.com / password123

---

## 📋 Demo Credentials

### Trainers
| Email | Password |
|-------|----------|
| trainer@disaster.gov | password123 |
| sarah.johnson@disaster.gov | password123 |

### Trainees
| Email | Password |
|-------|----------|
| alex.martin@rescue.com | password123 |
| jordan.lee@rescue.com | password123 |
| casey.wilson@rescue.com | password123 |
| morgan.taylor@rescue.com | password123 |

---

## 🗺️ Routing Guide

### Trainer Routes
- `/` - Role selection
- `/trainer/login` - Trainer login
- `/trainer/dashboard` - Main dashboard
- `/trainer/monitoring` - Monitor trainees
- `/trainer/alerts` - View alerts
- `/trainer/sessions` - Manage sessions
- `/trainer/reports` - View reports
- `/trainer/profile` - Profile settings

### Trainee Routes
- `/` - Role selection
- `/trainee/login` - Trainee login
- `/trainee/home` - Dashboard
- `/trainee/location` - Location tracking
- `/trainee/emergency` - Emergency features
- `/trainee/profile` - Profile settings

---

## 🔧 API Quick Reference

### Authentication
```bash
# Login
curl -X POST http://127.0.0.1:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"trainer@disaster.gov","password":"password123"}'

# Response
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user_id": "...",
    "role": "trainer"
  }
}
```

### Get Users by Role
```bash
curl http://127.0.0.1:5000/api/users/trainee

# Response: Array of trainee users
```

### Track Location
```bash
curl -X POST http://127.0.0.1:5000/api/track-location \
  -H "Content-Type: application/json" \
  -d '{
    "trainee_id":"<user_id>",
    "latitude":40.7128,
    "longitude":-74.0060
  }'
```

### Check Health
```bash
curl http://127.0.0.1:5000/health
```

---

## 🌐 WebSocket Quick Reference

### Connect to WebSocket
```javascript
import { socketService } from './services/socket';

socketService.connect(userId);
```

### Join Tracking Room
```javascript
socketService.joinTrackingRoom(traineeId);
```

### Send Location Update
```javascript
socketService.sendLocationUpdate(traineeId, latitude, longitude, accuracy);
```

### Send Alert
```javascript
socketService.sendAlert(sessionId, 'emergency', 'Emergency alert message', traineeId);
```

### Listen for Updates
```javascript
const unsubscribe = socketService.on('location_update', (data) => {
  console.log('Location update:', data);
});

// Unsubscribe when done
unsubscribe();
```

---

## 🎯 Common Tasks

### Enable Location Tracking
1. Login as trainee
2. Go to Location page
3. Click "Start Tracking" button
4. Allow browser geolocation permission
5. Location updates sent in real-time

### Send Alert
1. Login as trainer
2. Go to Alerts page
3. Select trainee
4. Choose alert type (Emergency/Warning/Info)
5. Enter message
6. Click Send

### Create Training Session
1. Login as trainer
2. Go to Sessions page
3. Click "New Session"
4. Fill in session details
5. Select trainees
6. Click Create

### View Trainee Location
1. Login as trainer
2. Go to Monitoring page
3. Select trainee from list
4. View real-time location on map
5. See GPS accuracy info

---

## 📊 Project Structure Quick View

```
disastermanagementsystem/
├── backend/                    # Python Flask API
│   ├── app.py                 # Main app
│   ├── requirements.txt        # Python deps
│   ├── routes/                # API routes
│   ├── models/                # Database models
│   └── utils/                 # Utilities
│
├── frontend/ui/               # React app
│   ├── src/
│   │   ├── services/          # API & Socket services
│   │   ├── hooks/             # Custom hooks
│   │   ├── components/        # React components
│   │   └── styles/            # CSS
│   └── package.json
│
├── README.md                  # Main guide
├── INTEGRATION_GUIDE.md        # Detailed guide
├── DEPLOYMENT.md              # Deploy guide
└── start_*.bat                # Startup scripts
```

---

## 🔌 Dependencies

### Backend
- Flask 3.0+ - Web framework
- Flask-CORS - CORS support
- Flask-SocketIO - WebSocket
- MongoDB - Database
- Bcrypt - Password hashing
- Python 3.9

### Frontend
- React 18 - UI library
- TypeScript - Type safety
- Vite - Build tool
- Socket.IO Client - WebSocket
- TailwindCSS - Styling
- Radix UI - Components

---

## ⚠️ Troubleshooting Quick Fix

### Backend Won't Start
```bash
# Check Python version
python --version  # Should be 3.8+

# Check MongoDB
mongod  # Or MongoDB service

# Check port
netstat -ano | findstr :5000  # Windows

# Kill process on port 5000
taskkill /PID <PID> /F  # Windows
```

### Frontend Won't Load
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 18+
```

### Location Not Updating
```
Check:
1. Geolocation permission in browser
2. WebSocket connection (check Console)
3. Backend running on http://127.0.0.1:5000
4. CORS configuration
```

### WebSocket Connection Error
```
Check:
1. Backend is running
2. Port 5000 is accessible
3. Frontend API_BASE_URL is correct
4. No firewall blocking
```

---

## 📱 Browser DevTools Tips

### Check WebSocket Connection
```javascript
// In browser console
socketService.socket  // Should show active socket

// Check connection status
socketService.socket.connected  // true/false

// View all events
socketService.listeners  // Map of listeners
```

### Debug API Calls
```javascript
// Network tab → Filter by Fetch/XHR
// Check:
// - Request URL
// - Request headers
// - Response status
// - Response body
```

### View Console Logs
```
F12 → Console tab
Check for:
- Connection success messages
- API response logs
- Error messages
- WebSocket events
```

---

## 🎓 Learning Resources

### Understanding the Architecture
1. Read `README.md` for overview
2. Review `INTEGRATION_GUIDE.md` for details
3. Check source code comments
4. Review `architecture` section in README

### API Documentation
1. See API endpoints in README
2. Review `routes/` directory in backend
3. Check `services/api.ts` in frontend

### WebSocket Learning
1. Read `utils/socketio_handlers.py`
2. Check `services/socket.ts`
3. Review `hooks/useRealtimeLocation.ts`

---

## 🚀 Next Steps

1. **Explore the Code**
   - Review backend routes
   - Check frontend components
   - Understand data flow

2. **Customize for Your Needs**
   - Modify API endpoints
   - Add new features
   - Customize UI

3. **Deploy to Production**
   - Follow `DEPLOYMENT.md`
   - Set up MongoDB Atlas
   - Configure environment variables
   - Deploy to cloud platform

4. **Add Features**
   - Advanced geofencing
   - Video streaming
   - Mobile app
   - Advanced analytics

---

## 📞 Common Questions

**Q: How do I enable real-time location?**
A: Login as trainee, go to Location page, click "Start Tracking"

**Q: How do I send alerts?**
A: Login as trainer, go to Alerts page, select trainee, send alert

**Q: How do I reset the database?**
A: Delete MongoDB data and run `python seed_demo_data.py`

**Q: Can I use this in production?**
A: Yes, follow the `DEPLOYMENT.md` guide for security hardening

**Q: How do I add new users?**
A: Use trainer dashboard or run seed_demo_data.py for demo accounts

**Q: How do I change ports?**
A: Backend: Update `config.py`, Frontend: Vite config

---

## 🔗 Useful Links

- Flask Documentation: https://flask.palletsprojects.com/
- Socket.IO Docs: https://socket.io/docs/
- React Docs: https://react.dev/
- MongoDB Docs: https://docs.mongodb.com/
- TailwindCSS: https://tailwindcss.com/

---

## 📝 File Purpose Quick Reference

| File | Purpose |
|------|---------|
| app.py | Main Flask application |
| requirements.txt | Python dependencies |
| package.json | Node.js dependencies |
| routes/*.py | API endpoint handlers |
| services/api.ts | Frontend API client |
| services/socket.ts | Frontend WebSocket client |
| hooks/useAuth.ts | Authentication state |
| hooks/useLocationTracking.ts | GPS tracking logic |
| socketio_handlers.py | WebSocket event handlers |

---

## ✅ Success Indicators

You know it's working when:
- ✅ Backend starts without errors
- ✅ Frontend loads at localhost:5173
- ✅ Can login with demo credentials
- ✅ Location tracking shows "Active"
- ✅ Real-time updates appear
- ✅ No errors in browser console
- ✅ WebSocket connects
- ✅ Alerts send and receive

---

**Last Updated**: February 4, 2026  
**Quick Ref Version**: 1.0
