import { motion } from 'motion/react';
import { Users, Lock, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function TraineeLogin() {
  const [traineeId, setTraineeId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    navigate('/trainee/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Mobile-optimized background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse-glow" />

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl mb-4 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-slate-100">Trainee Access</h1>
            <p className="text-slate-400">Field Participant Login</p>
          </div>

          {/* Login Form */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="traineeId" className="text-slate-300">Trainee ID</Label>
                <Input
                  id="traineeId"
                  type="text"
                  placeholder="Enter your ID"
                  value={traineeId}
                  onChange={(e) => setTraineeId(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 h-12 text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 h-12 text-base"
                  required
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <Lock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <p className="text-sm text-cyan-400">
                  Secure field connection
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white h-12 text-base"
              >
                Access Training Session
              </Button>
            </form>

            {/* Demo Info */}
            <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-slate-400">
                  <p className="font-medium mb-1">Demo Access:</p>
                  <p>Any ID and password will work for demonstration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-6">
            <a
              href="/"
              className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
            >
              ← Back to Role Selection
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
