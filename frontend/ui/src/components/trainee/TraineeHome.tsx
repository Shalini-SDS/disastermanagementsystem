import { TraineeLayout } from './TraineeLayout';
import { motion } from 'motion/react';
import { Droplets, MapPin, Clock, Battery, Signal, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

export function TraineeHome() {
  return (
    <TraineeLayout title="Training Session" disasterType="flood">
      <div className="space-y-4">
        {/* Session Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-cyan-600 to-blue-700 border-0 overflow-hidden relative">
            {/* Wave pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJ3YXZlcyIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMTBjMjAgMCA0MCAxMCA2MCAxMHM0MC0xMCA2MC0xMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3dhdmVzKSIvPjwvc3ZnPg==')]" />
            </div>

            <CardContent className="p-6 relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Droplets className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-1">Urban Flood Response</h2>
                  <p className="text-cyan-100 text-sm">River Delta Training Zone</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs text-cyan-100 mb-1">Session Time</p>
                  <p className="text-base font-bold text-white">2h 15m</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs text-cyan-100 mb-1">Your Status</p>
                  <p className="text-base font-bold text-white">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* GPS Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-slate-100">GPS Tracking</span>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Active
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Zone</span>
                  <span className="text-slate-200 font-medium">Zone A-3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Sync</span>
                  <span className="text-slate-200">30 seconds ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Signal Strength</span>
                  <div className="flex items-center gap-2">
                    <Signal className="w-4 h-4 text-green-500" />
                    <span className="text-green-400">Strong</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Device Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Battery className="w-5 h-5 text-green-500" />
                <span className="font-medium text-slate-100">Device Status</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-400">Battery Level</span>
                    <span className="text-slate-200 font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow" />
                    <span className="text-slate-300">Connected</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow" />
                    <span className="text-slate-300">Online</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Safety Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-4">
              <h3 className="font-medium text-slate-100 mb-4">Safety Checklist</h3>

              <div className="space-y-3">
                {[
                  { task: 'Equipment check completed', completed: true },
                  { task: 'Safety briefing attended', completed: true },
                  { task: 'GPS tracking enabled', completed: true },
                  { task: 'Emergency contact verified', completed: true },
                  { task: 'Zone boundaries confirmed', completed: false },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg"
                  >
                    {item.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-slate-600 rounded-full flex-shrink-0" />
                    )}
                    <span className={`text-sm ${item.completed ? 'text-slate-300' : 'text-slate-400'}`}>
                      {item.task}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="bg-cyan-500/10 border-cyan-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-cyan-300 mb-1">Important Reminder</h4>
                  <p className="text-sm text-cyan-400/80 leading-relaxed">
                    Stay within designated training zones. Use the Emergency button if you need immediate assistance.
                    Your location is monitored for safety.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Training Objectives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-4">
              <h3 className="font-medium text-slate-100 mb-3">Today's Objectives</h3>
              <ul className="space-y-2">
                {[
                  'Practice evacuation procedures',
                  'Navigate through flooded zones',
                  'Coordinate with team members',
                  'Use emergency communication protocols',
                ].map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span className="text-slate-300">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </TraineeLayout>
  );
}
