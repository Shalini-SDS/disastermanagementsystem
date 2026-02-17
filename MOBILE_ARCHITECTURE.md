# 🎨 Disaster Management App - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      MOBILE APP (React Native)                   │
│                    Vibrant Color Theme UI                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ (HTTP & WebSocket)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FLASK BACKEND API                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Routes:                                                │   │
│  │  • /auth (login, signup)                               │   │
│  │  • /user (profile management)                          │   │
│  │  • /sessions (session management)                      │   │
│  │  • /tracking (location updates)                        │   │
│  │  • /emergency (emergency alerts)                       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MongoDB Database                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │     Users    │  │   Sessions   │  │  Tracking    │           │
│  │              │  │              │  │              │           │
│  │ (Trainer &   │  │ (Training    │  │ (GPS coords) │           │
│  │  Trainee)    │  │  sessions)   │  │              │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐                              │
│  │  Alerts      │  │  Emergencies │                              │
│  │              │  │              │                              │
│  │ (Trainer     │  │ (Critical    │                              │
│  │  alerts)     │  │  incidents)  │                              │
│  └──────────────┘  └──────────────┘                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Mobile App Architecture

```
┌─────────────────────────────────────────┐
│         App.tsx (Entry Point)           │
│  - Auth check                           │
│  - Route to appropriate navigator       │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
  ┌─────────┐    ┌──────────────┐
  │ AuthNav │    │ AppNavigator │
  │ (Stack) │    │ (Tab-based)  │
  └─────────┘    └────────┬─────┘
                          │
              ┌───────────┼───────────┐
              │                       │
              ▼ (if Trainer)         ▼ (if Trainee)
         ┌─────────────┐        ┌──────────────┐
         │ TrainerTabs │        │TraineeTabs   │
         │ (6 tabs)    │        │ (4 tabs)     │
         └─────────────┘        └──────────────┘
              │                        │
       ┌──────┼──────┐          ┌──────┼──────┐
       │      │      │          │      │      │
       ▼      ▼      ▼          ▼      ▼      ▼
    [...tabs...]          [...tabs...]
```

---

## Component Hierarchy

```
App
├── AuthNavigator (Stack)
│   ├── RoleSelectionScreen
│   ├── TraineeLoginScreen
│   ├── TrainerLoginScreen
│   └── SignupScreen
│
├── TraineeTabNavigator (Tabs)
│   ├── TraineeHomeScreen
│   │   └── [Cards, SessionList, QuickActions]
│   ├── TraineeEmergencyScreen
│   │   └── [EmergencyButton, Message Input]
│   ├── TraineeLocationScreen
│   │   └── [Map, Tracking Switch, Coords]
│   └── TraineeProfileScreen
│       └── [ProfileInfo, EditForm]
│
└── TrainerTabNavigator (Tabs)
    ├── TrainerDashboardScreen
    │   └── [Stats, Charts, Alerts]
    ├── TrainerMonitoringScreen
    │   └── [TraineeList, LocationCards]
    ├── TrainerAlertsScreen
    │   └── [AlertList, ActionButtons]
    ├── TrainerSessionsScreen
    │   └── [SessionForm, SessionList]
    ├── TrainerReportsScreen
    │   └── [ReportCards, Analytics]
    └── TrainerProfileScreen
        └── [ProfileInfo, Certifications]
```

---

## Data Flow

### Authentication Flow
```
User Input (Login/Signup)
        │
        ▼
   useAuth Hook
        │
        ▼
  API Request (axios)
        │
        ▼
  Backend Validation
        │
        ▼
AsyncStorage (Save Token)
        │
        ▼
Navigate to App
```

### Location Tracking Flow
```
useLocationTracking Hook
        │
        ▼
Request Location Permission
        │
        ▼
Get Device GPS
        │
        ▼
Update State
        │
        ├──▶ UI Update
        │
        └──▶ Socket.io Emit
             │
             ▼
        Backend Receives
             │
             ▼
        Database Save
```

### Emergency Alert Flow
```
Emergency Button Tap
        │
        ▼
Show Confirmation
        │
        ▼
API Call + Socket Emit
        │
        ├──▶ API Endpoint
        │    │
        │    ▼
        │   DB Save
        │
        └──▶ Socket Event
             │
             ▼
        All Trainers Get Alert
             │
             ▼
        Firebase Push (future)
```

---

## File Structure & Responsibilities

```
src/
├── components/
│   ├── Button.tsx          → Reusable button with variants
│   ├── Input.tsx           → Form input with validation
│   └── Card.tsx            → Container with styling
│
├── screens/
│   ├── auth/               → Authentication flows
│   ├── trainee/            → Trainee-specific screens
│   └── trainer/            → Trainer-specific screens
│
├── hooks/
│   ├── useAuth.ts         → Auth state management
│   └── useLocationTracking.ts → GPS tracking
│
├── services/
│   ├── api.ts             → Not used (using utils instead)
│   └── socket.ts          → Not used (using utils instead)
│
├── utils/
│   ├── api.ts             → Axios API client
│   └── socket.ts          → Socket.io client
│
├── styles/
│   ├── colors.ts          → Vibrant color palette
│   └── spacing.ts         → Design tokens
│
└── navigation/
    └── Navigation.tsx     → Route configuration
```

---

## State Management Strategy

```
App Level:
├── User State (useAuth)
│   ├── user
│   ├── isLoading
│   ├── error
│   └── login/logout methods
│
└── Server State (API calls)
    ├── Sessions
    ├── Locations
    ├── Alerts
    └── Profile Data

Component Level:
├── Form State (useState)
├── UI State (loading, error)
└── Local preferences (AsyncStorage)
```

---

## Color System (Vibrant Theme)

```
Primary Brand
├── Dark Orange (#FF6B35) - Main actions
├── Light Orange (#FF8C5A) - Secondary
└── Lighter (#FFB088) - Tertiary

Secondary Brand
├── Dark Purple (#6C2E7A) - Secondary actions
├── Purple (#9D4EDD) - Secondary elements
└── Light Purple (#C77DFF) - Backgrounds

Alert Colors
├── 🚨 Red (#E63946) - Emergencies
├── 🟡 Orange (#F77F00) - Warnings
├── ✓ Green (#06A77D) - Success
├── ℹ️ Blue (#0066FF) - Info
└── 🟡 Yellow (#FFBE0B) - Caution

Modern
└── 🟦 Teal (#00B4A6) - Secondary screens
```

---

## Navigation Structure

### Auth Stack
```
RoleSelection → Trainer/Trainee Login
           ↓
         Signup
```

### Trainee Tabs (Bottom Navigation)
```
🏠 Home    🚨 Emergency    📍 Location    👤 Profile
```

### Trainer Tabs (Bottom Navigation - Swipeable)
```
📊 Dashboard  👁️ Monitor  🔔 Alerts  📚 Sessions  📈 Reports  👨‍🏫 Profile
```

---

## Key Integration Points

### 1. Backend API
- Base URL: `EXPO_PUBLIC_API_URL`
- Method: REST with axios
- Auth: JWT tokens in headers
- Error handling: Interceptors

### 2. Real-time Communication
- Protocol: WebSocket via Socket.io
- Server URL: `EXPO_PUBLIC_SOCKET_URL`
- Events: location, alerts, sessions

### 3. Device Features
- Location: Expo Location API
- Storage: AsyncStorage
- Permissions: Expo permissions

### 4. UI/UX
- Typography: Dynamic sizes
- Spacing: Consistent tokens
- Colors: Vibrant palette
- Icons: Unicode emojis (500+ available)

---

## Performance Optimizations

```
✓ Memoized Components
✓ Lazy Loading Screens
✓ Efficient Re-renders
✓ AsyncStorage Caching
✓ Debounced API Calls
✓ Optimized Location Updates
```

---

## Security Features

```
✓ JWT Token Storage
✓ API Token Injection
✓ Socket.io Auth
✓ Error Masking
✓ Secure Logout
✓ Request Validation
✓ CORS Handling
```

---

## Future Enhancements

```
Phase 1 (Now)
├── ✅ Core auth & navigation
├── ✅ Location tracking
├── ✅ Emergency alerts
├── ✅ Session management
└── ✅ Reports & analytics

Phase 2 (Next)
├── 🔔 Push notifications
├── 📍 Map integration
├── 🎥 Video streaming
├── 🌙 Dark mode
└── 🗣️ Offline mode

Phase 3 (Future)
├── 🗺️ Advanced mapping
├── 📊 Advanced analytics
├── 🔐 Biometric auth
├── 🌍 Multi-language
└── 🎁 Gamification
```

---

## Deployment Pipeline

```
Development
    ↓
Git Push
    ↓
Build APK/IPA
    ↓
Expo Build
    ↓
App Store / Play Store
    ↓
Production
```

---

## Key Metrics & Monitoring

- App load time
- API response time
- Location update frequency
- Battery consumption
- Memory usage
- Crash reports
- User engagement

---

## Mobile-Specific Considerations

```
Screen Sizes
├── Small (< 5") - Phone
├── Medium (5-7") - Phablet
├── Large (7-10") - Tablet
└── Extra Large (> 10") - Tablet

Orientations
├── Portrait (primary)
└── Landscape (secondary)

Connection Types
├── WiFi (preferred)
├── 4G/LTE
├── 3G
└── Offline

Device Categories
├── Low-end (2GB RAM)
├── Mid-range (4-6GB RAM)
└── High-end (8GB+ RAM)
```

---

**Note**: The architecture is designed to be scalable, maintainable, and easy to extend with new features!
