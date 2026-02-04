import { motion } from 'motion/react';
import { Shield, Users } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './ui/button';

export function RoleSelection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-glow" />
            <span className="text-blue-400 text-sm tracking-wider uppercase">System Active</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Disaster Management Training
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Real-Time Monitoring System for Emergency Response Training
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Trainer Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/trainer/login" className="block group">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02]">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-shadow">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-slate-100">Trainer Access</h2>
                  <p className="text-slate-400 leading-relaxed">
                    Command center for field officers. Monitor trainee locations, manage training sessions, and respond to alerts in real-time.
                  </p>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span>Live trainee monitoring</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span>Alert management system</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span>AI-powered insights</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Access Trainer Portal
                </Button>
              </div>
            </Link>
          </motion.div>

          {/* Trainee Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/trainee/login" className="block group">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-[1.02]">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-shadow">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-slate-100">Trainee Access</h2>
                  <p className="text-slate-400 leading-relaxed">
                    Mobile-first interface for field participants. Stay connected, view training status, and send emergency alerts during exercises.
                  </p>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                    <span>GPS tracking status</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                    <span>Emergency alert button</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                    <span>Session information</span>
                  </div>
                </div>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                  Access Trainee Portal
                </Button>
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8 text-sm text-slate-500"
        >
          Academic Project • Emergency Response Training System • Version 1.0
        </motion.div>
      </div>
    </div>
  );
}
