import { TrainerLayout } from './TrainerLayout';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Phone, MapPin, Shield, LogOut, Moon, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Avatar, AvatarFallback } from '../ui/avatar';

export function TrainerProfile() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [alertSounds, setAlertSounds] = useState(true);

  const [profile, setProfile] = useState({
    name: 'Dr. Alex Rivera',
    email: 'alex.rivera@disaster.gov',
    phone: '+1 (555) 123-4567',
    location: 'National Emergency Training Center',
    role: 'Senior Training Officer',
  });

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <TrainerLayout title="Profile & Settings">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600">
                  <AvatarFallback className="text-2xl text-white">AR</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-1">{profile.name}</h2>
                      <p className="text-slate-400">{profile.role}</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-blue-400">Trainer</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm md:col-span-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{profile.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <User className="w-5 h-5 text-blue-500" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Full Name</Label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="bg-slate-800/50 border-slate-700 text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Role</Label>
                  <Input
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="bg-slate-800/50 border-slate-700 text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Email</Label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="bg-slate-800/50 border-slate-700 text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Phone</Label>
                  <Input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="bg-slate-800/50 border-slate-700 text-slate-100"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-slate-300">Location</Label>
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="bg-slate-800/50 border-slate-700 text-slate-100"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  {isDarkMode ? <Moon className="w-5 h-5 text-slate-400" /> : <Sun className="w-5 h-5 text-slate-400" />}
                  <div>
                    <p className="text-sm font-medium text-slate-200">Dark Mode</p>
                    <p className="text-xs text-slate-400">Use dark theme for the interface</p>
                  </div>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                <div>
                  <p className="text-sm font-medium text-slate-200">Email Notifications</p>
                  <p className="text-xs text-slate-400">Receive updates about training sessions</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-slate-200">Alert Sounds</p>
                  <p className="text-xs text-slate-400">Play sound for high-priority alerts</p>
                </div>
                <Switch checked={alertSounds} onCheckedChange={setAlertSounds} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full bg-slate-800/50 border-slate-700 text-slate-300">
                Change Password
              </Button>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full bg-red-600/10 border-red-500/30 text-red-400 hover:bg-red-600/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Training Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Sessions Conducted</p>
                  <p className="text-3xl font-bold text-slate-100">47</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Total Trainees</p>
                  <p className="text-3xl font-bold text-slate-100">628</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Success Rate</p>
                  <p className="text-3xl font-bold text-green-500">94%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </TrainerLayout>
  );
}
