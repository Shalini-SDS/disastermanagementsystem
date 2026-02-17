import io, { Socket } from 'socket.io-client';

const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    auth: { token },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

/**
 * Socket event listeners
 */
export const socketEvents = {
  // Location events
  onLocationUpdate: (callback: (data: any) => void) => {
    socket?.on('location:update', callback);
  },
  
  // Alert events
  onAlertReceived: (callback: (data: any) => void) => {
    socket?.on('alert:received', callback);
  },
  
  // Emergency events
  onEmergencyTriggered: (callback: (data: any) => void) => {
    socket?.on('emergency:triggered', callback);
  },
  
  // Session events
  onSessionUpdate: (callback: (data: any) => void) => {
    socket?.on('session:update', callback);
  },
};

/**
 * Socket emit methods
 */
export const socketEmits = {
  joinSession: (sessionId: string) => {
    socket?.emit('session:join', { sessionId });
  },
  
  leaveSession: (sessionId: string) => {
    socket?.emit('session:leave', { sessionId });
  },
  
  sendLocation: (data: any) => {
    socket?.emit('location:send', data);
  },
  
  triggerEmergency: (data: any) => {
    socket?.emit('emergency:trigger', data);
  },
};
