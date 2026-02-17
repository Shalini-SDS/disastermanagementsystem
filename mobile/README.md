# Disaster Management Mobile App

A vibrant, modern React Native mobile application for disaster management training with support for both Trainers and Trainees.

## Features

### 🎨 Vibrant Design
- **Color Scheme**: Bright oranges, purples, teals, and reds for maximum visibility
- **Mobile-First**: Optimized touch interactions and mobile UX
- **Bottom Tab Navigation**: Easy access to all features with emoji icons
- **Responsive**: Adapts to all screen sizes

### 👨‍🏫 Trainer Features
- **Dashboard**: Overview of active sessions, trainees, and emergencies
- **Real-time Monitoring**: Track trainee locations with live updates
- **Alerts & Notifications**: Receive and manage emergency alerts
- **Session Management**: Create and manage training sessions
- **Performance Reports**: Analyze trainee performance and generate reports
- **Profile Management**: Update trainer information and certifications

### 👨‍🎓 Trainee Features
- **Home Screen**: View active sessions and quick action buttons
- **Emergency Alert**: Send immediate distress signals to trainers
- **Location Tracking**: Share real-time location with trainers
- **Profile Management**: Update personal and emergency contact information

### 🔒 Authentication
- Secure login for Trainers and Trainees
- Role-based access control
- Session management with JWT tokens

### 📍 Real-time Features
- Location tracking with Socket.io
- Live alerts and notifications
- Real-time session monitoring

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **State Management**: React Hooks
- **Styling**: React Native StyleSheet
- **API**: Axios
- **Real-time Communication**: Socket.io
- **Location Services**: Expo Location
- **Storage**: AsyncStorage
- **Language**: TypeScript

## Project Structure

```
mobile/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── screens/                 # Screen components
│   │   ├── auth/               # Authentication screens
│   │   ├── trainee/            # Trainee app screens
│   │   └── trainer/            # Trainer app screens
│   ├── hooks/                  # Custom React hooks
│   ├── services/               # API and Socket.io services
│   ├── utils/                  # Utility functions
│   ├── styles/                 # Design tokens and themes
│   └── navigation/             # Navigation configuration
├── App.tsx                     # Main app entry point
├── app.json                    # Expo configuration
├── package.json                # Dependencies
└── tsconfig.json              # TypeScript configuration
```

## Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Setup

1. **Install Dependencies**
   ```bash
   cd mobile
   npm install
   ```

2. **Configure Environment**
   Create a `.env` file:
   ```
   EXPO_PUBLIC_API_URL=http://your-backend-url:5000/api
   EXPO_PUBLIC_SOCKET_URL=http://your-backend-url:5000
   ```

3. **Start the App**
   ```bash
   npm start
   ```

   - For Android: `npm run android`
   - For iOS: `npm run ios`
   - For Web: `npm run web`

## API Integration

The app connects to the Flask backend. Ensure your backend is running at the configured API URL.

### Required Environment Variables
- `EXPO_PUBLIC_API_URL`: Backend API endpoint
- `EXPO_PUBLIC_SOCKET_URL`: Socket.io server URL

## Key Components

### Colors (Vibrant Theme)
- **Primary**: Orange (#FF6B35) - Main brand color
- **Secondary**: Purple (#6C2E7A) - Secondary brand
- **Accent Red**: #E63946 - Emergencies
- **Accent Green**: #06A77D - Success
- **Teal**: #00B4A6 - Modern feel
- **Yellow**: #FFBE0B - Caution

### Navigation Structure

**Auth Stack**
- Role Selection
- Trainer Login
- Trainee Login
- Signup

**Trainee Tabs** (4 tabs visible)
- Home - Active sessions and quick actions
- Emergency - Send emergency alerts
- Location - Track and share location
- Profile - View and edit profile

**Trainer Tabs** (6 tabs - swipeable)
- Dashboard - Overview and stats
- Monitor - Real-time location tracking
- Alerts - Emergency notifications
- Sessions - Manage training sessions
- Reports - Performance analysis
- Profile - Trainer information

## Permissions Required

- **Location**: For real-time trainee tracking
- **Camera** (optional): For future video features
- **Microphone** (optional): For future audio features

## Development

### Adding New Screens

1. Create screen in `src/screens/{role}/`
2. Import in navigation file
3. Add to navigation stack/tabs

### Styling

- Use `Colors` from `@/styles/colors.ts`
- Use `Spacing` from `@/styles/spacing.ts`
- Follow the component pattern in existing files

### API Calls

Use the predefined API clients in `@/utils/api.ts`:
- `authAPI` - Authentication
- `userAPI` - User management
- `sessionAPI` - Session management
- `trackingAPI` - Location tracking
- `emergencyAPI` - Emergency management

## Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

## Troubleshooting

### Location Services Not Working
- Ensure location permissions are granted
- Check `EXPO_PUBLIC_API_URL` is correct
- Verify backend Socket.io is running

### API Connection Issues
- Verify backend is running
- Check network connectivity
- Review `.env` file configuration

### Build Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Expo cache: `expo r -c`
- Update Expo: `expo@latest`

## Performance Optimization

- ✓ Memoized components
- ✓ Lazy loading of screens
- ✓ Optimized re-renders
- ✓ Efficient location tracking

## Security Features

- ✓ JWT token authentication
- ✓ Encrypted AsyncStorage
- ✓ API request interceptors
- ✓ Secure Socket.io connection

## Future Enhancements

- [ ] Push notifications
- [ ] Video streaming
- [ ] Map integration
- [ ] Offline mode
- [ ] Data encryption
- [ ] Biometric authentication
- [ ] Multi-language support
- [ ] Dark mode

## License

This project is part of the Disaster Management System. All rights reserved.

## Support

For issues or questions, contact the development team.

---

**Made with ❤️ for Disaster Management Training**
