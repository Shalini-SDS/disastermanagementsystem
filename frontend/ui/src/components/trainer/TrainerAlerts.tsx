import { TrainerLayout } from './TrainerLayout';
import { motion } from 'motion/react';
import { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, XCircle, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Alert {
  id: number;
  trainee: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'resolved' | 'dismissed';
  time: string;
  description: string;
  aiInsight?: string;
}

export function TrainerAlerts() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [resolving, setResolving] = useState<number | null>(null);

  const alerts: Alert[] = [
    {
      id: 1,
      trainee: 'Sarah Johnson',
      type: 'Unusual Inactivity',
      severity: 'medium',
      status: 'active',
      time: '2 min ago',
      description: 'Trainee has been stationary for 8 minutes in Zone A-3',
      aiInsight: 'Pattern suggests possible equipment check or rest break',
    },
    {
      id: 2,
      trainee: 'Mike Chen',
      type: 'Out of Bounds',
      severity: 'high',
      status: 'resolved',
      time: '15 min ago',
      description: 'Trainee left designated training zone boundary',
      aiInsight: 'Returned to zone within 3 minutes',
    },
    {
      id: 3,
      trainee: 'Emma Davis',
      type: 'Connection Lost',
      severity: 'low',
      status: 'resolved',
      time: '1 hour ago',
      description: 'GPS signal temporarily lost for 2 minutes',
    },
    {
      id: 4,
      trainee: 'James Wilson',
      type: 'Elevated Heart Rate',
      severity: 'medium',
      status: 'active',
      time: '5 min ago',
      description: 'Heart rate elevated to 125 BPM in Zone C-2',
      aiInsight: 'Consistent with high-intensity training activity',
    },
    {
      id: 5,
      trainee: 'Lisa Anderson',
      type: 'Low Battery',
      severity: 'low',
      status: 'active',
      time: '10 min ago',
      description: 'Device battery at 18%',
    },
    {
      id: 6,
      trainee: 'David Brown',
      type: 'Rapid Movement',
      severity: 'medium',
      status: 'dismissed',
      time: '30 min ago',
      description: 'Sudden rapid movement detected',
      aiInsight: 'Normal evacuation drill response',
    },
  ];

  const handleResolve = (alertId: number) => {
    setResolving(alertId);
    setTimeout(() => {
      setResolving(null);
      // In real app, would update alert status
    }, 1500);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'low':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getSeverityIcon = (severity: string) => {
    return severity === 'high' ? '🔴' : severity === 'medium' ? '🟡' : '⚪';
  };

  const filterAlertsByStatus = (status: string) => {
    return alerts.filter((alert) => {
      const matchesStatus = status === 'all' || alert.status === status;
      const matchesSearch =
        alert.trainee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  };

  return (
    <TrainerLayout title="Alert Management" disasterType="flood">
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Alerts', value: alerts.filter((a) => a.status === 'active').length, color: 'text-amber-500' },
            { label: 'Resolved Today', value: alerts.filter((a) => a.status === 'resolved').length, color: 'text-green-500' },
            { label: 'High Priority', value: alerts.filter((a) => a.severity === 'high').length, color: 'text-red-500' },
            { label: 'AI Insights', value: alerts.filter((a) => a.aiInsight).length, color: 'text-cyan-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-6">
                  <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search alerts by trainee or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
            />
          </div>
          <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-300">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Alerts Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="bg-slate-800/50 border border-slate-700/50">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
              All ({alerts.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-amber-600">
              Active ({alerts.filter((a) => a.status === 'active').length})
            </TabsTrigger>
            <TabsTrigger value="resolved" className="data-[state=active]:bg-green-600">
              Resolved ({alerts.filter((a) => a.status === 'resolved').length})
            </TabsTrigger>
          </TabsList>

          {['all', 'active', 'resolved'].map((status) => (
            <TabsContent key={status} value={status}>
              <div className="grid lg:grid-cols-2 gap-4">
                {filterAlertsByStatus(status).map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card
                      className={`bg-slate-900/50 backdrop-blur-sm border-slate-700/50 hover:border-slate-600/50 transition-all cursor-pointer ${
                        selectedAlert?.id === alert.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedAlert(alert)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg">{getSeverityIcon(alert.severity)}</span>
                              <CardTitle className="text-base text-slate-100">{alert.type}</CardTitle>
                            </div>
                            <p className="text-sm text-slate-400">{alert.trainee}</p>
                          </div>
                          <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-300 mb-3">{alert.description}</p>

                        {alert.aiInsight && (
                          <div className="mb-3 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                            <div className="flex items-start gap-2">
                              <div className="w-5 h-5 bg-cyan-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs">AI</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-xs text-cyan-400 font-medium mb-1">AI Insight</p>
                                <p className="text-xs text-cyan-300/80">{alert.aiInsight}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Clock className="w-3 h-3" />
                            {alert.time}
                          </div>

                          <div className="flex items-center gap-2">
                            {alert.status === 'active' && (
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleResolve(alert.id);
                                }}
                                disabled={resolving === alert.id}
                                className="bg-green-600 hover:bg-green-700 text-white h-8"
                              >
                                {resolving === alert.id ? (
                                  <>
                                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Resolving...
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Resolve
                                  </>
                                )}
                              </Button>
                            )}

                            {alert.status === 'resolved' && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Resolved
                              </Badge>
                            )}

                            {alert.status === 'dismissed' && (
                              <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
                                <XCircle className="w-3 h-3 mr-1" />
                                Dismissed
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Alert Timeline */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <Clock className="w-5 h-5 text-blue-500" />
              Alert Timeline (Last 24 Hours)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-700/50" />

              <div className="space-y-6">
                {alerts.slice(0, 5).map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative pl-14"
                  >
                    <div
                      className={`absolute left-4 w-4 h-4 rounded-full border-2 border-slate-900 ${
                        alert.severity === 'high'
                          ? 'bg-red-500'
                          : alert.severity === 'medium'
                          ? 'bg-amber-500'
                          : 'bg-slate-500'
                      }`}
                    />
                    <div className="bg-slate-800/30 p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium text-slate-200">{alert.trainee}</p>
                          <p className="text-xs text-slate-400">{alert.type}</p>
                        </div>
                        <span className="text-xs text-slate-500">{alert.time}</span>
                      </div>
                      <p className="text-xs text-slate-400">{alert.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TrainerLayout>
  );
}
