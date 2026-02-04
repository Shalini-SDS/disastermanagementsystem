import { useEffect, useState, useCallback } from 'react';
import { socketService, LocationUpdateEvent, AlertEvent } from '../services/socket';

export function useRealtimeLocation(traineeId: string | null, sessionId: string | null = null) {
  const [connectedTrainees, setConnectedTrainees] = useState<Map<string, LocationUpdateEvent>>(new Map());
  const [alerts, setAlerts] = useState<AlertEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!traineeId) return;

    // Connect to WebSocket
    socketService.connect(traineeId);
    setIsConnected(true);

    // Join tracking room
    socketService.joinTrackingRoom(traineeId, sessionId || undefined);

    // Listen for location updates
    const unsubscribeLocation = socketService.on('location_update', (data: LocationUpdateEvent) => {
      setConnectedTrainees((prev) => {
        const updated = new Map(prev);
        updated.set(data.trainee_id, data);
        return updated;
      });
    });

    // Listen for alerts
    const unsubscribeAlert = socketService.on('alert', (data: AlertEvent) => {
      setAlerts((prev) => [data, ...prev].slice(0, 50)); // Keep last 50 alerts
    });

    // Send periodic heartbeat
    const heartbeatInterval = setInterval(() => {
      socketService.sendHeartbeat(traineeId);
    }, 30000); // Every 30 seconds

    return () => {
      unsubscribeLocation();
      unsubscribeAlert();
      clearInterval(heartbeatInterval);
      socketService.leaveTrackingRoom(traineeId);
    };
  }, [traineeId, sessionId]);

  const getTraineeLocation = useCallback((tId: string) => {
    return connectedTrainees.get(tId);
  }, [connectedTrainees]);

  const getAllLocations = useCallback(() => {
    return Array.from(connectedTrainees.values());
  }, [connectedTrainees]);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  return {
    connectedTrainees,
    alerts,
    isConnected,
    getTraineeLocation,
    getAllLocations,
    clearAlerts,
  };
}
