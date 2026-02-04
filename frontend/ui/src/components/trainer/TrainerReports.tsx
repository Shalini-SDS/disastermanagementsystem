import { TrainerLayout } from './TrainerLayout';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Download, Calendar, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function TrainerReports() {
  const participationData = [
    { month: 'Oct', trainees: 38 },
    { month: 'Nov', trainees: 42 },
    { month: 'Dec', trainees: 45 },
    { month: 'Jan', trainees: 48 },
    { month: 'Feb', trainees: 42 },
  ];

  const disasterTypeData = [
    { name: 'Flood', value: 45, color: '#06b6d4' },
    { name: 'Fire', value: 30, color: '#f97316' },
    { name: 'Earthquake', value: 25, color: '#f59e0b' },
  ];

  const performanceData = [
    { metric: 'Response Time', score: 87 },
    { metric: 'Safety Protocol', score: 92 },
    { metric: 'Communication', score: 85 },
    { metric: 'Team Coordination', score: 90 },
    { metric: 'Equipment Usage', score: 88 },
  ];

  const aiInsights = [
    {
      id: 1,
      title: 'Training Effectiveness',
      insight: 'Response times have improved by 15% over the last 3 months',
      type: 'positive',
      confidence: 94,
    },
    {
      id: 2,
      title: 'Zone Coverage Analysis',
      insight: 'Zone B-4 consistently shows lower trainee presence, consider redistributing groups',
      type: 'suggestion',
      confidence: 87,
    },
    {
      id: 3,
      title: 'Peak Activity Hours',
      insight: 'Trainees show highest engagement between 10 AM - 2 PM',
      type: 'insight',
      confidence: 91,
    },
    {
      id: 4,
      title: 'Risk Pattern Detection',
      insight: 'Unusual inactivity alerts decrease by 40% after scheduled breaks',
      type: 'positive',
      confidence: 89,
    },
  ];

  return (
    <TrainerLayout title="Reports & Analytics" disasterType="flood">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-1">Performance Analytics</h2>
            <p className="text-slate-400">Data-driven insights for training optimization</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-300">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 Days
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Completion Rate', value: '94%', change: '+5%', color: 'text-green-500' },
            { label: 'Avg. Session Duration', value: '4.2h', change: '+0.3h', color: 'text-blue-500' },
            { label: 'Total Participants', value: '248', change: '+32', color: 'text-cyan-500' },
            { label: 'Safety Score', value: '9.2/10', change: '+0.4', color: 'text-amber-500' },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-6">
                  <p className="text-sm text-slate-400 mb-2">{metric.label}</p>
                  <div className="flex items-end justify-between">
                    <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
                    <div className="flex items-center gap-1 text-sm text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>{metric.change}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Participation Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Trainee Participation Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={participationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                      }}
                    />
                    <Line type="monotone" dataKey="trainees" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Training Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <BarChart3 className="w-5 h-5 text-cyan-500" />
                  Training by Disaster Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={disasterTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {disasterTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Training Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" />
                  <YAxis dataKey="metric" type="category" stroke="#94a3b8" width={150} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="score" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <Brain className="w-5 h-5 text-cyan-500" />
                  AI-Powered Insights
                </CardTitle>
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                  Analysis
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-4">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Brain className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-slate-200">{insight.title}</h4>
                          <Badge
                            variant="outline"
                            className={
                              insight.type === 'positive'
                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                : insight.type === 'suggestion'
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            }
                          >
                            {insight.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{insight.insight}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-cyan-500"
                              style={{ width: `${insight.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500">{insight.confidence}% confidence</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <p className="text-sm text-cyan-300">
                  <span className="font-medium">Note:</span> AI insights are generated from historical training data and
                  are provided as suggestions. All decisions should be validated by qualified trainers.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </TrainerLayout>
  );
}
