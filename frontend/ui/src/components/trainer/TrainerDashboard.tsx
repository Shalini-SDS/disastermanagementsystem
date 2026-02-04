import { TrainerLayout } from './TrainerLayout';
import { motion } from 'motion/react';
import { Users, UserCheck, AlertTriangle, Activity, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function TrainerDashboard() {
  const stats = [
    {
      title: 'Total Trainees',
      value: '48',
      change: '+4 from last session',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Trainees',
      value: '42',
      change: '87.5% participation',
      icon: UserCheck,
      color: 'bg-green-500',
    },
    {
      title: 'Risk Alerts',
      value: '3',
      change: '2 resolved today',
      icon: AlertTriangle,
      color: 'bg-amber-500',
    },
    {
      title: 'Training Hours',
      value: '124',
      change: 'This month',
      icon: Activity,
      color: 'bg-cyan-500',
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      trainee: 'Sarah Johnson',
      type: 'Inactivity Detected',
      time: '2 min ago',
      severity: 'medium',
      status: 'Active',
    },
    {
      id: 2,
      trainee: 'Mike Chen',
      type: 'Out of Bounds',
      time: '15 min ago',
      severity: 'high',
      status: 'Resolved',
    },
    {
      id: 3,
      trainee: 'Emma Davis',
      type: 'Connection Lost',
      time: '1 hour ago',
      severity: 'low',
      status: 'Resolved',
    },
  ];

  const activeTrainees = [
    { id: 1, name: 'Sarah Johnson', status: 'Active', location: 'Zone A-3', lastUpdate: '1 min ago' },
    { id: 2, name: 'Mike Chen', status: 'Active', location: 'Zone B-1', lastUpdate: '2 min ago' },
    { id: 3, name: 'Emma Davis', status: 'Idle', location: 'Zone A-5', lastUpdate: '8 min ago' },
    { id: 4, name: 'James Wilson', status: 'Active', location: 'Zone C-2', lastUpdate: '30 sec ago' },
    { id: 5, name: 'Lisa Anderson', status: 'Active', location: 'Zone B-4', lastUpdate: '3 min ago' },
  ];

  return (
    <TrainerLayout title="Dashboard Overview" disasterType="flood">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50 hover:border-slate-600/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-100 mb-1">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.change}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Live Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <MapPin className="w-5 h-5 text-cyan-500" />
                  Live Training Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-slate-800/50 rounded-lg border border-slate-700/50 relative overflow-hidden">
                  {/* Map Placeholder with animated markers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 to-blue-950/30">
                    {/* Grid overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
                    
                    {/* Animated markers */}
                    {[
                      { x: '25%', y: '30%', status: 'safe' },
                      { x: '60%', y: '45%', status: 'safe' },
                      { x: '40%', y: '70%', status: 'attention' },
                      { x: '75%', y: '35%', status: 'safe' },
                      { x: '50%', y: '55%', status: 'safe' },
                    ].map((marker, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-4 h-4 rounded-full"
                        style={{ left: marker.x, top: marker.y }}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      >
                        <div className={`w-full h-full rounded-full ${
                          marker.status === 'safe' ? 'bg-green-500' :
                          marker.status === 'attention' ? 'bg-amber-500' :
                          'bg-red-500'
                        } shadow-[0_0_10px_currentColor]`} />
                      </motion.div>
                    ))}

                    {/* Zone labels */}
                    <div className="absolute top-4 left-4 bg-slate-900/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-cyan-500/30">
                      <p className="text-xs text-cyan-400">Training Zone: River Delta</p>
                    </div>

                    <div className="absolute bottom-4 right-4 flex gap-3">
                      <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-700/50">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-xs text-slate-300">Safe (38)</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-700/50">
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span className="text-xs text-slate-300">Attention (4)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium text-slate-200">{alert.trainee}</p>
                        <Badge
                          variant={alert.severity === 'high' ? 'destructive' : 'secondary'}
                          className={
                            alert.severity === 'high'
                              ? 'bg-red-500/20 text-red-400 border-red-500/30'
                              : alert.severity === 'medium'
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                              : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                          }
                        >
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mb-1">{alert.type}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Active Trainees List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <Activity className="w-5 h-5 text-green-500" />
                Active Trainees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-3 px-4 text-sm text-slate-400">Trainee</th>
                      <th className="text-left py-3 px-4 text-sm text-slate-400">Status</th>
                      <th className="text-left py-3 px-4 text-sm text-slate-400">Location</th>
                      <th className="text-left py-3 px-4 text-sm text-slate-400">Last Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeTrainees.map((trainee) => (
                      <tr
                        key={trainee.id}
                        className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm text-slate-200">{trainee.name}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              trainee.status === 'Active' ? 'bg-green-500 animate-pulse-glow' : 'bg-slate-500'
                            }`} />
                            <span className={`text-sm ${
                              trainee.status === 'Active' ? 'text-green-400' : 'text-slate-400'
                            }`}>
                              {trainee.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-400">{trainee.location}</td>
                        <td className="py-3 px-4 text-sm text-slate-500">{trainee.lastUpdate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </TrainerLayout>
  );
}
