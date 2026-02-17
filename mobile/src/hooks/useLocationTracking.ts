import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { socketEmits } from '@/utils/socket';

export const useLocationTracking = (sessionId: string, enabled: boolean = true) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    if (!enabled || !sessionId) return;

    let subscription: any;

    const startTracking = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission denied');
          return;
        }

        setIsTracking(true);
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Best,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (loc) => {
            const coords = {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              accuracy: loc.coords.accuracy,
              altitude: loc.coords.altitude,
              timestamp: new Date().toISOString(),
            };
            setLocation(coords);
            socketEmits.sendLocation({ sessionId, ...coords });
          }
        );
      } catch (err) {
        setError(err);
        setIsTracking(false);
      }
    };

    startTracking();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [enabled, sessionId]);

  return { location, error, isTracking };
};
