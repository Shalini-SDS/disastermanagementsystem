import { TrainerLayout } from './TrainerLayout';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Calendar, Plus, Users, MapPin, Clock, Droplets, Flame, Mountain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface Session {
  id: number;
  name: string;
  disasterType: 'flood' | 'fire' | 'earthquake';
  status: 'upcoming' | 'ongoing' | 'completed';
  date: string;
  duration: string;
  location: string;
  trainees: number;
  maxTrainees: number;
}

export function TrainerSessions() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const [disasterType, setDisasterType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const sessions: Session[] = [
    {
      id: 1,
      name: 'Urban Flood Response Training',
      disasterType: 'flood',
      status: 'ongoing',
      date: 'Today, 10:00 AM',
      duration: '4 hours',
      location: 'River Delta Training Zone',
      trainees: 42,
      maxTrainees: 50,
    },
    {
      id: 2,
      name: 'Wildfire Evacuation Drill',
      disasterType: 'fire',
      status: 'upcoming',
      date: 'Tomorrow, 9:00 AM',
      duration: '3 hours',
      location: 'Forest Sector Training Area',
      trainees: 28,
      maxTrainees: 40,
    },
    {
      id: 3,
      name: 'Earthquake Safety Protocol',
      disasterType: 'earthquake',
      status: 'upcoming',
      date: 'Feb 5, 2026',
      duration: '5 hours',
      location: 'Urban Simulation Center',
      trainees: 35,
      maxTrainees: 45,
    },
    {
      id: 4,
      name: 'Coastal Tsunami Preparedness',
      disasterType: 'flood',
      status: 'completed',
      date: 'Feb 1, 2026',
      duration: '6 hours',
      location: 'Coastal Training Facility',
      trainees: 48,
      maxTrainees: 50,
    },
  ];

  const getDisasterIcon = (type: string) => {
    switch (type) {
      case 'flood':
        return <Droplets className="w-5 h-5" />;
      case 'fire':
        return <Flame className="w-5 h-5" />;
      case 'earthquake':
        return <Mountain className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getDisasterColor = (type: string) => {
    switch (type) {
      case 'flood':
        return 'from-cyan-500 to-blue-600';
      case 'fire':
        return 'from-orange-500 to-red-600';
      case 'earthquake':
        return 'from-amber-500 to-yellow-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const handleCreateSession = () => {
    // Mock session creation
    setIsCreateDialogOpen(false);
    setSessionName('');
    setDisasterType('');
    setLocation('');
    setDescription('');
  };

  return (
    <TrainerLayout title="Training Sessions" disasterType="flood">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-1">Manage Training Sessions</h2>
            <p className="text-slate-400">Create, monitor, and review disaster response training exercises</p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create New Session
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700 text-slate-100 max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Training Session</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Session Name</Label>
                  <Input
                    placeholder="e.g., Urban Flood Response Training"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Disaster Type</Label>
                    <Select value={disasterType} onValueChange={setDisasterType}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                        <SelectValue placeholder="Select disaster type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                        <SelectItem value="flood">Flood</SelectItem>
                        <SelectItem value="fire">Fire</SelectItem>
                        <SelectItem value="earthquake">Earthquake</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      placeholder="Training zone"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-slate-800 border-slate-700 text-slate-100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe the training objectives and scenarios..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-slate-100 min-h-[100px]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="bg-slate-800 border-slate-700 text-slate-300">
                    Cancel
                  </Button>
                  <Button onClick={handleCreateSession} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Create Session
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sessions Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50 hover:border-slate-600/50 transition-all overflow-hidden">
                {/* Disaster Type Header */}
                <div className={`h-2 bg-gradient-to-r ${getDisasterColor(session.disasterType)}`} />

                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${getDisasterColor(session.disasterType)} rounded-lg flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]`}>
                        {getDisasterIcon(session.disasterType)}
                      </div>
                      <div>
                        <CardTitle className="text-lg text-slate-100">{session.name}</CardTitle>
                        <p className="text-sm text-slate-400 capitalize">{session.disasterType} Training</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{session.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm col-span-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{session.location}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Users className="w-4 h-4" />
                        <span>Trainees Enrolled</span>
                      </div>
                      <span className="text-sm font-medium text-slate-300">
                        {session.trainees} / {session.maxTrainees}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getDisasterColor(session.disasterType)}`}
                        style={{ width: `${(session.trainees / session.maxTrainees) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      View Details
                    </Button>
                    {session.status === 'ongoing' && (
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                        Monitor Live
                      </Button>
                    )}
                    {session.status === 'upcoming' && (
                      <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                        Start Session
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Session Statistics */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-slate-100">Session Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-slate-400 mb-2">Total Sessions (This Month)</p>
                <p className="text-3xl font-bold text-slate-100">12</p>
                <p className="text-xs text-green-400 mt-1">+3 from last month</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-2">Average Attendance</p>
                <p className="text-3xl font-bold text-slate-100">89%</p>
                <p className="text-xs text-green-400 mt-1">+5% improvement</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-2">Total Training Hours</p>
                <p className="text-3xl font-bold text-slate-100">124</p>
                <p className="text-xs text-slate-400 mt-1">Across all sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TrainerLayout>
  );
}
