import { TrainerLayout } from './TrainerLayout';
import { motion } from 'motion/react';
import { useState } from 'react';
import { MapPin, Search, Filter, Maximize2, Navigation } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface Trainee {
  id: number;
  name: string;
  status: 'safe' | 'attention' | 'risk';
  location: { x: string; y: string };
  zone: string;
  lastUpdate: string;
  heartRate?: number;
  battery: number;
}

export function TrainerMonitoring() {
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const trainees: Trainee[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      status: 'attention',
      location: { x: '40%', y: '70%' },
      zone: 'Zone A-3',
      lastUpdate: '1 min ago',
      heartRate: 95,
      battery: 78,
    },
    {
      id: 2,
      name: 'Mike Chen',
      status: 'safe',
      location: { x: '60%', y: '45%' },
      zone: 'Zone B-1',
      lastUpdate: '2 min ago',
      heartRate: 82,
      battery: 92,
    },
    {
      id: 3,
      name: 'Emma Davis',
      status: 'safe',
      location: { x: '25%', y: '30%' },
      zone: 'Zone A-5',
      lastUpdate: '30 sec ago',
      heartRate: 76,
      battery: 65,
    },
    {
      id: 4,
      name: 'James Wilson',
      status: 'safe',
      location: { x: '75%', y: '35%' },
      zone: 'Zone C-2',
      lastUpdate: '3 min ago',
      heartRate: 88,
      battery: 84,
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      status: 'safe',
      location: { x: '50%', y: '55%' },
      zone: 'Zone B-4',
      lastUpdate: '1 min ago',
      heartRate: 79,
      battery: 71,
    },
  ];

  const filteredTrainees = trainees.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-green-500';
      case 'attention':
        return 'bg-amber-500';
      case 'risk':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <TrainerLayout title="Live Trainee Monitoring" disasterType="flood">
      <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        {/* Trainee List Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search trainees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400">{filteredTrainees.length} Trainees</span>
                <Button variant="ghost" size="sm" className="text-slate-400 h-8">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2 max-h-[calc(100vh-20rem)] overflow-y-auto">
                {filteredTrainees.map((trainee) => (
                  <motion.div
                    key={trainee.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTrainee(trainee)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedTrainee?.id === trainee.id
                        ? 'bg-blue-600/20 border border-blue-500/50'
                        : 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(trainee.status)} animate-pulse-glow`} />
                        <span className="text-sm font-medium text-slate-200">{trainee.name}</span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 space-y-1">
                      <p>{trainee.zone}</p>
                      <p className="text-slate-500">{trainee.lastUpdate}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Map View */}
        <div className="lg:col-span-3 space-y-4">
          {/* Map Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                <Navigation className="w-3 h-3 mr-1" />
                GPS Tracking Active
              </Badge>
              <Badge className="bg-slate-700/50 text-slate-300 border-slate-600/50">
                42 Active
              </Badge>
            </div>
            <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700 text-slate-300">
              <Maximize2 className="w-4 h-4 mr-2" />
              Fullscreen
            </Button>
          </div>

          {/* Interactive Map */}
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50 h-full">
            <CardContent className="p-0 h-full">
              <div className="relative h-full bg-slate-800/50 rounded-lg overflow-hidden">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 to-blue-950/30">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

                  {/* Geo-fence boundary */}
                  <div className="absolute inset-[10%] border-2 border-cyan-500/30 rounded-lg">
                    <div className="absolute -top-6 left-4 bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-cyan-500/50">
                      <span className="text-xs text-cyan-400">Training Zone Boundary</span>
                    </div>
                  </div>

                  {/* Trainee Markers */}
                  {trainees.map((trainee) => (
                    <motion.div
                      key={trainee.id}
                      className="absolute cursor-pointer"
                      style={{ left: trainee.location.x, top: trainee.location.y }}
                      animate={{
                        scale: selectedTrainee?.id === trainee.id ? [1, 1.3, 1] : 1,
                      }}
                      transition={{
                        duration: 1,
                        repeat: selectedTrainee?.id === trainee.id ? Infinity : 0,
                      }}
                      onClick={() => setSelectedTrainee(trainee)}
                      whileHover={{ scale: 1.2 }}
                    >
                      <div className="relative">
                        <div
                          className={`w-5 h-5 rounded-full ${getStatusColor(trainee.status)} shadow-[0_0_15px_currentColor] border-2 border-slate-900`}
                        />
                        {selectedTrainee?.id === trainee.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900/95 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-700 whitespace-nowrap z-10"
                          >
                            <p className="text-xs font-medium text-slate-100">{trainee.name}</p>
                            <p className="text-xs text-slate-400">{trainee.zone}</p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm p-4 rounded-lg border border-slate-700/50">
                    <p className="text-xs font-medium text-slate-300 mb-2">Status Legend</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                        <span className="text-xs text-slate-400">Safe (38)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-500 rounded-full" />
                        <span className="text-xs text-slate-400">Attention (4)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <span className="text-xs text-slate-400">Risk (0)</span>
                      </div>
                    </div>
                  </div>

                  {/* Selected Trainee Info Panel */}
                  {selectedTrainee && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-4 right-4 w-64 bg-slate-900/95 backdrop-blur-sm p-4 rounded-lg border border-slate-700/50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-slate-100">{selectedTrainee.name}</h3>
                        <Badge
                          className={
                            selectedTrainee.status === 'safe'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : selectedTrainee.status === 'attention'
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }
                        >
                          {selectedTrainee.status}
                        </Badge>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="text-slate-400 mb-1">Location</p>
                          <p className="text-slate-200">{selectedTrainee.zone}</p>
                        </div>

                        {selectedTrainee.heartRate && (
                          <div>
                            <p className="text-slate-400 mb-1">Heart Rate</p>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse-glow" />
                              <p className="text-slate-200">{selectedTrainee.heartRate} BPM</p>
                            </div>
                          </div>
                        )}

                        <div>
                          <p className="text-slate-400 mb-1">Device Battery</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  selectedTrainee.battery > 50
                                    ? 'bg-green-500'
                                    : selectedTrainee.battery > 20
                                    ? 'bg-amber-500'
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${selectedTrainee.battery}%` }}
                              />
                            </div>
                            <span className="text-slate-200">{selectedTrainee.battery}%</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-slate-400 mb-1">Last Update</p>
                          <p className="text-slate-200">{selectedTrainee.lastUpdate}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TrainerLayout>
  );
}
