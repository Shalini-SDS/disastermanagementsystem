import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '@/styles/colors';
import { Text, View, StyleSheet } from 'react-native';

// Auth Screens
import { RoleSelectionScreen } from '@/screens/auth/RoleSelectionScreen';
import { TraineeLoginScreen } from '@/screens/auth/TraineeLoginScreen';
import { TrainerLoginScreen } from '@/screens/auth/TrainerLoginScreen';
import { SignupScreen } from '@/screens/auth/SignupScreen';

// Trainee Screens
import { TraineeHomeScreen } from '@/screens/trainee/TraineeHomeScreen';
import { TraineeEmergencyScreen } from '@/screens/trainee/TraineeEmergencyScreen';
import { TraineeLocationScreen } from '@/screens/trainee/TraineeLocationScreen';
import { TraineeProfileScreen } from '@/screens/trainee/TraineeProfileScreen';

// Trainer Screens
import { TrainerDashboardScreen } from '@/screens/trainer/TrainerDashboardScreen';
import { TrainerMonitoringScreen } from '@/screens/trainer/TrainerMonitoringScreen';
import { TrainerAlertsScreen } from '@/screens/trainer/TrainerAlertsScreen';
import { TrainerSessionsScreen } from '@/screens/trainer/TrainerSessionsScreen';
import { TrainerReportsScreen } from '@/screens/trainer/TrainerReportsScreen';
import { TrainerProfileScreen } from '@/screens/trainer/TrainerProfileScreen';

// QR Scanner
import { QRScannerScreen } from '@/screens/QRScannerScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Navigation Stack
export const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: Colors.neutral.white },
    }}
  >
    <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
    <Stack.Screen name="TraineeLogin" component={TraineeLoginScreen} />
    <Stack.Screen name="TrainerLogin" component={TrainerLoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

// Trainee Tab Navigation
export const TraineeTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.primary.main,
      tabBarInactiveTintColor: Colors.neutral.gray400,
      tabBarStyle: {
        backgroundColor: Colors.neutral.white,
        borderTopColor: Colors.primary.lighter,
        borderTopWidth: 2,
        height: 65,
        paddingBottom: 12,
        paddingTop: 8,
        shadowColor: Colors.primary.main,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
      },
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '700',
        marginTop: 4,
      },
    }}
  >
    <Tab.Screen
      name="TraineeHome"
      component={TraineeHomeScreen}
      options={{
        title: 'Home',
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, focused }) => (
          <View style={[styles.tabIconContainer, focused && { backgroundColor: Colors.primary.lighter }]}>
            <Text style={{ fontSize: 24, color }}>🏠</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="TraineeEmergency"
      component={TraineeEmergencyScreen}
      options={{
        title: 'Emergency',
        tabBarLabel: 'Emergency',
        tabBarIcon: ({ color, focused }) => (
          <View style={[styles.tabIconContainer, focused && { backgroundColor: Colors.accent.red }]}>
            <Text style={{ fontSize: 24, color }}>🚨</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="TraineeLocation"
      component={TraineeLocationScreen}
      options={{
        title: 'Location',
        tabBarLabel: 'Location',
        tabBarIcon: ({ color, focused }) => (
          <View style={[styles.tabIconContainer, focused && { backgroundColor: Colors.secondary.light }]}>
            <Text style={{ fontSize: 24, color }}>📍</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="TraineeProfile"
      component={TraineeProfileScreen}
      options={{
        title: 'Profile',
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, focused }) => (
          <View style={[styles.tabIconContainer, focused && { backgroundColor: Colors.accent.purple }]}>
            <Text style={{ fontSize: 24, color }}>👤</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="QRScanner"
      component={QRScannerScreen}
      options={{
        title: 'Scan QR',
        tabBarLabel: 'QR',
        tabBarIcon: ({ color, focused }) => (
          <View style={[styles.tabIconContainer, focused && { backgroundColor: Colors.accent.cyan }]}>
            <Text style={{ fontSize: 24, color }}>📱</Text>
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

// Trainer Tab Navigation
export const TrainerTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.primary.main,
      tabBarInactiveTintColor: Colors.neutral.gray400,
      tabBarStyle: {
        backgroundColor: Colors.neutral.white,
        borderTopColor: Colors.primary.lighter,
        borderTopWidth: 2,
        height: 65,
        paddingBottom: 12,
        paddingTop: 8,
        shadowColor: Colors.primary.main,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
      },
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '700',
        marginTop: 4,
      },
    }}
  >
    <Tab.Screen
      name="TrainerDashboard"
      component={TrainerDashboardScreen}
      options={{
        title: 'Dashboard',
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ color, focused }) => (
          <View style={[styles.tabIconContainer, focused && { backgroundColor: Colors.primary.lighter }]}>
            <Text style={{ fontSize: 24, color }}>📊</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="TrainerMonitoring"
      component={TrainerMonitoringScreen}
      options={{
        title: 'Monitor',
        tabBarLabel: 'Monitor',
        tabBarIcon: ({ color, focused }) => (
          <View style={[styles.tabIconContainer, focused && { backgroundColor: Colors.secondary.light }]}>
            <Text style={{ fontSize: 24, color }}>👁️</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="TrainerAlerts"
      component={TrainerAlertsScreen}
      options={{
        title: 'Alerts',
        tabBarLabel: 'Alerts',
        tabBarIcon: ({ color, focused }) => (
          <View style={[styles.tabIconContainer, focused && { backgroundColor: Colors.accent.red }]}>
            <Text style={{ fontSize: 24, color }}>🔔</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="TrainerSessions"
      component={TrainerSessionsScreen}
      options={{
        title: 'Sessions',
        tabBarLabel: 'Sessions',
        tabBarIcon: ({ color, focused }) => (
          <View style={[styles.tabIconContainer, focused && { backgroundColor: Colors.accent.purple }]}>
            <Text style={{ fontSize: 24, color }}>📚</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="TrainerReports"
      component={TrainerReportsScreen}
      options={{
        title: 'Reports',
        tabBarLabel: 'Reports',
        tabBarIcon: ({ color, focused }) => (
          <View style={[styles.tabIconContainer, focused && { backgroundColor: Colors.accent.green }]}>
            <Text style={{ fontSize: 24, color }}>📈</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="TrainerProfile"
      component={TrainerProfileScreen}
      options={{
        title: 'Profile',
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, focused }) => (
          <View style={[styles.tabIconContainer, focused && { backgroundColor: Colors.accent.blue }]}>
            <Text style={{ fontSize: 24, color }}>👨‍🏫</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="QRScanner"
      component={QRScannerScreen}
      options={{
        title: 'Scan QR',
        tabBarLabel: 'QR',
        tabBarIcon: ({ color, focused }) => (
          <View style={[styles.tabIconContainer, focused && { backgroundColor: Colors.accent.cyan }]}>
            <Text style={{ fontSize: 24, color }}>📱</Text>
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabIconContainer: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
});

