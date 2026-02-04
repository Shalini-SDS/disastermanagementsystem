import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Home, MapPin, AlertOctagon, User, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface TraineeLayoutProps {
  children: ReactNode;
  title: string;
  showBack?: boolean;
  disasterType?: 'flood' | 'fire' | 'earthquake';
}

export function TraineeLayout({ children, title, showBack = false, disasterType }: TraineeLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/trainee/home', icon: Home },
    { name: 'Location', href: '/trainee/location', icon: MapPin },
    { name: 'Emergency', href: '/trainee/emergency', icon: AlertOctagon },
    { name: 'Profile', href: '/trainee/profile', icon: User },
  ];

  const getDisasterGradient = () => {
    switch (disasterType) {
      case 'flood':
        return 'from-cyan-500/20 to-blue-500/20';
      case 'fire':
        return 'from-orange-500/20 to-red-500/20';
      case 'earthquake':
        return 'from-amber-500/20 to-yellow-500/20';
      default:
        return 'from-cyan-500/20 to-blue-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col relative overflow-hidden">
      {/* Background effects - optimized for mobile */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className={`fixed top-0 right-0 w-80 h-80 bg-gradient-to-br ${getDisasterGradient()} rounded-full blur-[120px] animate-pulse-glow`} />

      {/* Header */}
      <header className="relative z-10 bg-slate-900/30 backdrop-blur-sm border-b border-slate-700/50 px-4 py-4 safe-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-slate-400 hover:text-slate-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div>
              <h1 className="text-lg font-bold text-slate-100">{title}</h1>
              {disasterType && (
                <div className="flex items-center gap-2 mt-0.5">
                  <div className={`w-2 h-2 rounded-full ${
                    disasterType === 'flood' ? 'bg-cyan-500' :
                    disasterType === 'fire' ? 'bg-orange-500' :
                    'bg-amber-500'
                  } animate-pulse-glow`} />
                  <span className="text-xs text-slate-400 capitalize">{disasterType} Training</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-800/50 border border-slate-700 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow" />
            <span className="text-xs text-slate-300">Active</span>
          </div>
        </div>
      </header>

      {/* Main Content - scrollable with safe area */}
      <main className="relative z-10 flex-1 overflow-y-auto pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4"
        >
          {children}
        </motion.div>
      </main>

      {/* Bottom Navigation - Fixed with safe area */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 bg-slate-900/90 backdrop-blur-sm border-t border-slate-700/50 safe-bottom">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            const isEmergency = item.name === 'Emergency';
            
            return (
              <Link key={item.name} to={item.href}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`w-full flex flex-col items-center gap-1 py-3 rounded-lg transition-colors ${
                    isActive
                      ? isEmergency
                        ? 'bg-red-600 text-white'
                        : 'bg-cyan-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.name}</span>
                </motion.button>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
