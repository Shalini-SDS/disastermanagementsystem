import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://127.0.0.1:5000';

export interface LocationUpdateEvent {
  trainee_id: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: string;
}

export interface AlertEvent {
  session_id: string;
  type: 'emergency' | 'warning' | 'info';
  message: string;
  trainee_id?: string;
  timestamp: string;
}

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  connect(userId: string) {
    if (this.socket?.connected) return this.socket;

    this.socket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      this.emit('connection', { userId });
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('location_update', (data: LocationUpdateEvent) => {
      this.triggerListeners('location_update', data);
    });

    this.socket.on('alert', (data: AlertEvent) => {
      this.triggerListeners('alert', data);
    });

    this.socket.on('heartbeat_ack', (data: any) => {
      this.triggerListeners('heartbeat_ack', data);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn(`Cannot emit event "${event}": socket not connected`);
    }
  }

  joinTrackingRoom(traineeId: string, sessionId?: string) {
    this.emit('join_tracking_room', {
      trainee_id: traineeId,
      session_id: sessionId,
    });
  }

  leaveTrackingRoom(traineeId: string) {
    this.emit('leave_tracking_room', {
      trainee_id: traineeId,
    });
  }

  sendLocationUpdate(traineeId: string, latitude: number, longitude: number, accuracy?: number) {
    this.emit('location_update', {
      trainee_id: traineeId,
      latitude,
      longitude,
      accuracy,
      timestamp: new Date().toISOString(),
    });
  }

  sendAlert(sessionId: string, type: 'emergency' | 'warning' | 'info', message: string, traineeId?: string) {
    this.emit('session_alert', {
      session_id: sessionId,
      type,
      message,
      trainee_id: traineeId,
    });
  }

  sendHeartbeat(traineeId: string) {
    this.emit('heartbeat', {
      trainee_id: traineeId,
      timestamp: new Date().toISOString(),
    });
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  private triggerListeners(event: string, data: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in listener for event "${event}":`, error);
        }
      });
    }
  }
}

export const socketService = new SocketService();
