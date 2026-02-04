import { TraineeLayout } from './TraineeLayout';
import { motion } from 'motion/react';
import { MapPin, Navigation, Signal, Clock, Radio, Wifi } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export function TraineeLocation() {
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
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="relative">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)] border-4 border-slate-900" />
                    <div className="absolute -inset-2 bg-cyan-500/30 rounded-full animate-ping" />
                  </div>
                </motion.div>

                {/* Zone label */}
                <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/30">
                  <p className="text-xs text-cyan-400 font-medium">Zone A-3</p>
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
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Tracked
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-sm text-slate-400">Training Zone</span>
                  <span className="text-sm font-medium text-slate-200">Zone A-3</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-sm text-slate-400">Coordinates</span>
                  <span className="text-xs font-mono text-slate-200">40.7128°N, 74.0060°W</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-sm text-slate-400">Altitude</span>
                  <span className="text-sm font-medium text-slate-200">12m</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-sm text-slate-400">Distance from Start</span>
                  <span className="text-sm font-medium text-slate-200">2.3 km</span>
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

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Signal className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-slate-400">GPS Signal</span>
                  </div>
                  <p className="text-base font-bold text-green-400">Strong</p>
                </div>

                <div className="p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Radio className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-slate-400">Satellites</span>
                  </div>
                  <p className="text-base font-bold text-slate-200">12</p>
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
                    <span className="text-xs text-slate-400">Accuracy</span>
                  </div>
                  <p className="text-base font-bold text-slate-200">±3m</p>
                </div>
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
                    <p className="text-base font-medium text-slate-200">30 seconds ago</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-glow" />
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
