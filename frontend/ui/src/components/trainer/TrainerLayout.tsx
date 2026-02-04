import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Radio,
  AlertTriangle,
  Calendar,
  BarChart3,
  User,
  LogOut,
  Menu,
  Shield,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useState } from 'react';

interface TrainerLayoutProps {
  children: ReactNode;
  title: string;
  disasterType?: 'flood' | 'fire' | 'earthquake';
}

export function TrainerLayout({ children, title, disasterType }: TrainerLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/trainer/dashboard', icon: LayoutDashboard },
    { name: 'Live Monitoring', href: '/trainer/monitoring', icon: Radio },
    { name: 'Alerts', href: '/trainer/alerts', icon: AlertTriangle },
    { name: 'Sessions', href: '/trainer/sessions', icon: Calendar },
    { name: 'Reports', href: '/trainer/reports', icon: BarChart3 },
    { name: 'Profile', href: '/trainer/profile', icon: User },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const getDisasterColor = () => {
    switch (disasterType) {
      case 'flood':
        return 'from-cyan-500/20 to-blue-500/20';
      case 'fire':
        return 'from-orange-500/20 to-red-500/20';
      case 'earthquake':
        return 'from-amber-500/20 to-yellow-500/20';
      default:
        return 'from-blue-500/20 to-cyan-500/20';
    }
  };

  const Sidebar = () => (
    <div className="h-full flex flex-col bg-slate-900/50 backdrop-blur-sm border-r border-slate-700/50">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-slate-100">Command Center</div>
            <div className="text-xs text-slate-400">Trainer Portal</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.name} to={item.href} onClick={() => setMobileMenuOpen(false)}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700/50">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${getDisasterColor()} rounded-full blur-[150px] animate-pulse-glow`} />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 relative z-10">
        <div className="fixed top-0 left-0 w-64 h-screen">
          <Sidebar />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {/* Header */}
        <header className="bg-slate-900/30 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="text-slate-400">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 bg-slate-900 border-slate-700">
                  <Sidebar />
                </SheetContent>
              </Sheet>

              <div>
                <h1 className="text-xl font-bold text-slate-100">{title}</h1>
                {disasterType && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      disasterType === 'flood' ? 'bg-cyan-500' :
                      disasterType === 'fire' ? 'bg-orange-500' :
                      'bg-amber-500'
                    } animate-pulse-glow`} />
                    <span className="text-sm text-slate-400 capitalize">{disasterType} Training Active</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow" />
              <span className="text-sm text-slate-300">System Online</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
