import { TraineeLayout } from './TraineeLayout';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { User, Mail, Phone, MapPin, LogOut, Shield, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';

export function TraineeProfile() {
  const navigate = useNavigate();

  const trainee = {
    name: 'Sarah Johnson',
    id: 'TRN-2024-048',
    email: 'sarah.johnson@trainee.org',
    phone: '+1 (555) 234-5678',
    location: 'Zone A-3',
    sessions: 12,
    hoursCompleted: 48,
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <TraineeLayout title="Profile" disasterType="flood">
      <div className="space-y-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 mb-3">
                  <AvatarFallback className="text-2xl text-white">SJ</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold text-slate-100 mb-1">{trainee.name}</h2>
                <p className="text-sm text-slate-400 mb-3">{trainee.id}</p>
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                  <Shield className="w-3 h-3 mr-1" />
                  Active Trainee
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <div className="flex-1 text-left">
                    <p className="text-xs text-slate-400">Email</p>
                    <p className="text-sm text-slate-200">{trainee.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <div className="flex-1 text-left">
                    <p className="text-xs text-slate-400">Phone</p>
                    <p className="text-sm text-slate-200">{trainee.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <div className="flex-1 text-left">
                    <p className="text-xs text-slate-400">Current Zone</p>
                    <p className="text-sm text-slate-200">{trainee.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Training Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <Award className="w-5 h-5 text-cyan-500" />
                Training Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/30 rounded-lg">
                  <p className="text-sm text-slate-400 mb-1">Sessions Completed</p>
                  <p className="text-3xl font-bold text-cyan-400">{trainee.sessions}</p>
                </div>
                <div className="p-4 bg-slate-800/30 rounded-lg">
                  <p className="text-sm text-slate-400 mb-1">Training Hours</p>
                  <p className="text-3xl font-bold text-cyan-400">{trainee.hoursCompleted}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Recent Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Urban Flood Response', date: 'Today', type: 'flood' },
                  { name: 'Wildfire Evacuation', date: 'Jan 30', type: 'fire' },
                  { name: 'Earthquake Safety', date: 'Jan 28', type: 'earthquake' },
                ].map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        session.type === 'flood' ? 'bg-cyan-500' :
                        session.type === 'fire' ? 'bg-orange-500' :
                        'bg-amber-500'
                      }`} />
                      <div>
                        <p className="text-sm text-slate-200">{session.name}</p>
                        <p className="text-xs text-slate-400">{session.date}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      Completed
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🎯', label: 'Perfect Attendance', earned: true },
                  { icon: '⚡', label: 'Quick Response', earned: true },
                  { icon: '🏆', label: 'Safety Champion', earned: false },
                  { icon: '⭐', label: 'Team Leader', earned: false },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border text-center ${
                      achievement.earned
                        ? 'bg-cyan-500/10 border-cyan-500/30'
                        : 'bg-slate-800/30 border-slate-700/50 opacity-50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <p className="text-xs text-slate-300">{achievement.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-4 space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-slate-800/50 border-slate-700 text-slate-300"
              >
                <User className="w-4 h-4 mr-3" />
                Edit Profile
              </Button>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full justify-start bg-red-600/10 border-red-500/30 text-red-400 hover:bg-red-600/20"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className="text-center text-xs text-slate-500 py-4">
            <p>Disaster Management Training System</p>
            <p className="mt-1">Version 1.0 • Academic Project</p>
          </div>
        </motion.div>
      </div>
    </TraineeLayout>
  );
}
