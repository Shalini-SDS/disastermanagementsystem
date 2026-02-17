import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/styles/colors';
import { AuthNavigator, TraineeTabNavigator, TrainerTabNavigator } from '@/navigation/Navigation';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<'Auth' | 'Trainee' | 'Trainer' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const userData = await AsyncStorage.getItem('userData');

        if (token && userData) {
          const user = JSON.parse(userData);
          setInitialRoute(user.role === 'trainer' ? 'Trainer' : 'Trainee');
        } else {
          setInitialRoute('Auth');
        }
      } catch (error) {
        setInitialRoute('Auth');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading || !initialRoute) {
    return (
      <View style={[styles.container, { backgroundColor: Colors.primary.dark }]}>
        <View style={styles.splashContent}>
          <View style={styles.splashGradient} />
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ 
          headerShown: false,
          cardStyle: { backgroundColor: Colors.neutral.white }
        }}
        initialRouteName={initialRoute}
      >
        {initialRoute === 'Auth' ? (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ animationEnabled: false }}
          />
        ) : initialRoute === 'Trainee' ? (
          <Stack.Screen
            name="Trainee"
            component={TraineeTabNavigator}
            options={{ animationEnabled: false }}
          />
        ) : (
          <Stack.Screen
            name="Trainer"
            component={TrainerTabNavigator}
            options={{ animationEnabled: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.secondary.main,
    opacity: 0.8,
  },
});
