import { useState, useCallback, useEffect } from 'react';
import { apiService } from '../services/api';

export interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: Date;
  accuracy?: number;
  speed?: number;
}

export function useLocationTracking(traineeId: string | null, enabled: boolean = true) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [locationHistory, setLocationHistory] = useState<LocationData[]>([]);

  const updateLocation = useCallback(
    async (latitude: number, longitude: number, accuracy?: number, speed?: number) => {
      if (!traineeId) {
        setError('Trainee ID is required');
        return;
      }

      try {
        const locationData: LocationData = {
          latitude,
          longitude,
          timestamp: new Date(),
          accuracy,
          speed,
        };

        // Send to backend
        await apiService.trackLocation(traineeId, latitude, longitude);

        // Update local state
        setLocation(locationData);
        setLocationHistory((prev) => [...prev, locationData]);
        setError(null);

        return locationData;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to track location';
        setError(errorMessage);
        console.error('Location tracking error:', err);
      }
    },
    [traineeId]
  );

  const startTracking = useCallback(() => {
    if (!enabled || !traineeId) {
      setError('Cannot start tracking');
      return;
    }

    setIsTracking(true);
    setError(null);

    // Request geolocation permission
    if ('geolocation' in navigator) {
      // Watch position for real-time updates
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          updateLocation(latitude, longitude, accuracy);
        },
        (err) => {
          setError(`Geolocation error: ${err.message}`);
          setIsTracking(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
        setIsTracking(false);
      };
    } else {
      setError('Geolocation is not supported by this browser');
      setIsTracking(false);
    }
  }, [enabled, traineeId, updateLocation]);

  const stopTracking = useCallback(() => {
    setIsTracking(false);
  }, []);

  const syncToServer = useCallback(async () => {
    if (locationHistory.length === 0) return;

    try {
      const logsToSync = locationHistory.map((loc) => ({
        trainee_id: traineeId,
        latitude: loc.latitude,
        longitude: loc.longitude,
        timestamp: loc.timestamp.toISOString(),
        accuracy: loc.accuracy,
        speed: loc.speed,
      }));

      await apiService.syncData(logsToSync);
      setLocationHistory([]);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sync location data';
      setError(errorMessage);
      console.error('Sync error:', err);
    }
  }, [locationHistory, traineeId]);

  useEffect(() => {
    if (enabled && traineeId && isTracking) {
      const cleanup = startTracking();
      return () => {
        if (cleanup) cleanup();
      };
    }
  }, [enabled, traineeId, isTracking, startTracking]);

  return {
    location,
    error,
    isTracking,
    locationHistory,
    startTracking,
    stopTracking,
    updateLocation,
    syncToServer,
  };
}
