import { TraineeLayout } from './TraineeLayout';
import { motion } from 'motion/react';
import { MapPin, Navigation, Signal, Clock, Radio, Wifi, Play, Pause } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useLocationTracking } from '../../hooks/useLocationTracking';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export function TraineeLocation() {
  const traineeId = localStorage.getItem('userId');
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const { location, isTracking, startTracking, stopTracking, syncToServer, error } = useLocationTracking(traineeId, true);

  useEffect(() => {
    if (error) {
      toast.error(`Location error: ${error}`);
    }
  }, [error]);

  const handleToggleTracking = () => {
    if (isTracking) {
      stopTracking();
      toast.info('Location tracking stopped');
    } else {
      startTracking();
      toast.success('Location tracking started');
    }
  };

  const handleSync = async () => {
    try {
      await syncToServer();
      setLastSyncTime(new Date());
      toast.success('Location data synced successfully');
    } catch (err) {
      toast.error('Failed to sync location data');
    }
  };

  const getTimeSinceSync = () => {
    if (!lastSyncTime) return 'Not synced';
    const seconds = Math.floor((Date.now() - lastSyncTime.getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hours ago`;
  };

  const getCoordinates = () => {
    if (!location) return { lat: '40.7128', lng: '74.0060' };
    return {
      lat: location.latitude.toFixed(4),
      lng: location.longitude.toFixed(4),
    };
  };

  const getAccuracy = () => {
    if (!location) return '±10m';
    return `±${location.accuracy?.toFixed(1) || '5'}m`;
  };

  const getZone = () => {
    if (!location) return 'Zone A-3';
    const lat = location.latitude;
    const lng = location.longitude;
    // Simple zone calculation based on coordinates
    const zoneNum = Math.floor((lat + lng) * 10) % 10;
    return `Zone ${String.fromCharCode(65 + (zoneNum % 5))}-${zoneNum}`;
  };

  const coords = getCoordinates();

  return (
    <TraineeLayout title="Location & Status" disasterType="flood" showBack>
      <div className="space-y-4">
        {/* Map View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50 overflow-hidden">
            <div className="aspect-square bg-slate-800/50 relative">
              {/* Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 to-blue-950/30">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />

                {/* Zone boundary */}
                <div className="absolute inset-[15%] border-2 border-cyan-500/30 rounded-lg" />

                {/* User position marker */}
                <motion.div
                  className="absolute top-[45%] left-[45%]"
                  animate={isTracking ? {
                    scale: [1, 1.2, 1],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="relative">
                    <div className={`w-6 h-6 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)] border-4 border-slate-900 ${
                      isTracking ? 'bg-cyan-500' : 'bg-slate-500'
                    }`} />
                    <div className={`absolute -inset-2 rounded-full ${
                      isTracking ? 'bg-cyan-500/30 animate-ping' : 'hidden'
                    }`} />
                  </div>
                </motion.div>

                {/* Zone label */}
                <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/30">
                  <p className="text-xs text-cyan-400 font-medium">{getZone()}</p>
                </div>

                {/* Compass */}
                <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm p-3 rounded-lg border border-slate-700/50">
                  <Navigation className="w-6 h-6 text-cyan-400" style={{ transform: 'rotate(45deg)' }} />
                </div>

                {/* Scale indicator */}
                <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-700/50">
                  <p className="text-xs text-slate-400">100m</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Current Location Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-slate-100 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-500" />
                  Current Location
                </h3>
                <Badge className={`${
                  isTracking ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                }`}>
                  {isTracking ? 'Tracking' : 'Paused'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-sm text-slate-400">Training Zone</span>
                  <span className="text-sm font-medium text-slate-200">{getZone()}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-sm text-slate-400">Coordinates</span>
                  <span className="text-xs font-mono text-slate-200">{coords.lat}°N, {coords.lng}°W</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-sm text-slate-400">Accuracy</span>
                  <span className="text-sm font-medium text-slate-200">{getAccuracy()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* GPS Status Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-4">
              <h3 className="font-medium text-slate-100 mb-4">GPS & Connection Status</h3>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Signal className={`w-4 h-4 ${isTracking ? 'text-green-500' : 'text-slate-500'}`} />
                    <span className="text-xs text-slate-400">GPS Signal</span>
                  </div>
                  <p className={`text-base font-bold ${isTracking ? 'text-green-400' : 'text-slate-400'}`}>
                    {isTracking ? 'Strong' : 'Inactive'}
                  </p>
                </div>

                <div className="p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Radio className={`w-4 h-4 ${isTracking ? 'text-green-500' : 'text-slate-500'}`} />
                    <span className="text-xs text-slate-400">Satellites</span>
                  </div>
                  <p className="text-base font-bold text-slate-200">{isTracking ? '12' : '0'}</p>
                </div>

                <div className="p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wifi className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-slate-400">Network</span>
                  </div>
                  <p className="text-base font-bold text-green-400">Online</p>
                </div>

                <div className="p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-cyan-500" />
                    <span className="text-xs text-slate-400">Updates</span>
                  </div>
                  <p className="text-base font-bold text-slate-200">{isTracking ? 'Live' : 'Off'}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleToggleTracking}
                  className={`flex-1 ${
                    isTracking
                      ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30'
                      : 'bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30'
                  }`}
                >
                  {isTracking ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Stop Tracking
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Tracking
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleSync}
                  className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
                >
                  Sync Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Last Sync */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Last Location Sync</p>
                    <p className="text-base font-medium text-slate-200">{getTimeSinceSync()}</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  isTracking ? 'bg-green-500 animate-pulse-glow' : 'bg-slate-500'
                }`} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Safety Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="bg-cyan-500/10 border-cyan-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-cyan-300 mb-1">Location Tracking Active</h4>
                  <p className="text-sm text-cyan-400/80 leading-relaxed">
                    Your location is continuously monitored for safety. Stay within the designated training zone
                    marked on the map.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </TraineeLayout>
  );
}
