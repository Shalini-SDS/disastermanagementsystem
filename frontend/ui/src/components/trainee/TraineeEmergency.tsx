import { TraineeLayout } from './TraineeLayout';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { AlertOctagon, CheckCircle, Clock, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { toast } from 'sonner@2.0.3';

export function TraineeEmergency() {
  const [isPressed, setIsPressed] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [alertSent, setAlertSent] = useState(false);
  const [alertStatus, setAlertStatus] = useState<'sending' | 'sent' | 'acknowledged' | null>(null);
  const holdTimerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const HOLD_DURATION = 2000; // 2 seconds to activate

  const handlePressStart = () => {
    setIsPressed(true);
    setHoldProgress(0);

    const startTime = Date.now();

    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setHoldProgress(progress);
    }, 50);

    holdTimerRef.current = window.setTimeout(() => {
      handleEmergencyActivate();
    }, HOLD_DURATION);
  };

  const handlePressEnd = () => {
    setIsPressed(false);

    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    if (holdProgress < 100) {
      setHoldProgress(0);
    }
  };

  const handleEmergencyActivate = () => {
    setIsPressed(false);
    setHoldProgress(100);
    setAlertStatus('sending');

    // Simulate sending alert
    setTimeout(() => {
      setAlertStatus('sent');
      setAlertSent(true);
      toast.success('Emergency alert sent to command center');

      // Simulate acknowledgment
      setTimeout(() => {
        setAlertStatus('acknowledged');
      }, 3000);
    }, 1500);
  };

  const handleReset = () => {
    setAlertSent(false);
    setAlertStatus(null);
    setHoldProgress(0);
  };

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  return (
    <TraineeLayout title="Emergency Alert" disasterType="flood" showBack>
      <div className="space-y-6 pb-8">
        <AnimatePresence mode="wait">
          {!alertSent ? (
            <motion.div
              key="alert-button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              {/* Instructions */}
              <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-4">
                  <h3 className="font-medium text-slate-100 mb-3">Emergency Protocol</h3>
                  <ol className="space-y-2">
                    {[
                      'Press and hold the red button below for 2 seconds',
                      'Alert will be sent to command center with your location',
                      'Wait for acknowledgment from trainers',
                      'Stay calm and follow trainer instructions',
                    ].map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="text-slate-300 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* Emergency Button */}
              <div className="flex flex-col items-center py-8">
                <p className="text-slate-400 mb-6 text-center text-sm">
                  {isPressed
                    ? 'Hold to activate emergency alert...'
                    : 'Press and hold the button to send alert'}
                </p>

                <div className="relative">
                  {/* Outer glow ring */}
                  <motion.div
                    className="absolute -inset-8 rounded-full"
                    animate={{
                      boxShadow: isPressed
                        ? [
                            '0 0 0px rgba(239, 68, 68, 0.3)',
                            '0 0 60px rgba(239, 68, 68, 0.5)',
                            '0 0 0px rgba(239, 68, 68, 0.3)',
                          ]
                        : '0 0 0px rgba(239, 68, 68, 0)',
                    }}
                    transition={{ duration: 1, repeat: isPressed ? Infinity : 0 }}
                  />

                  {/* Progress ring */}
                  <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      stroke="rgba(239, 68, 68, 0.2)"
                      strokeWidth="4"
                      fill="none"
                    />
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      stroke="#ef4444"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      style={{
                        pathLength: holdProgress / 100,
                        strokeDasharray: '1 1',
                      }}
                      animate={{
                        pathLength: holdProgress / 100,
                      }}
                    />
                  </svg>

                  {/* Main Button */}
                  <motion.button
                    onPointerDown={handlePressStart}
                    onPointerUp={handlePressEnd}
                    onPointerLeave={handlePressEnd}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-48 h-48 rounded-full bg-gradient-to-br from-red-600 to-red-700 shadow-[0_0_40px_rgba(239,68,68,0.4)] border-4 border-red-500 transition-all ${
                      isPressed ? 'shadow-[0_0_60px_rgba(239,68,68,0.6)] scale-95' : ''
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <AlertOctagon className="w-16 h-16 text-white mb-2" />
                      <span className="text-white font-bold text-lg">EMERGENCY</span>
                      {isPressed && (
                        <span className="text-white/80 text-xs mt-1">Hold...</span>
                      )}
                    </div>
                  </motion.button>
                </div>

                <p className="text-slate-500 text-xs mt-6 text-center max-w-xs">
                  Only use in actual emergencies. False alerts may result in training penalties.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="alert-status"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Status Card */}
              <Card className={`border-2 ${
                alertStatus === 'acknowledged'
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    {alertStatus === 'sending' && (
                      <>
                        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
                        <h3 className="text-xl font-bold text-red-400 mb-2">Sending Alert...</h3>
                        <p className="text-slate-400">Contacting command center</p>
                      </>
                    )}

                    {alertStatus === 'sent' && (
                      <>
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                          <AlertOctagon className="w-8 h-8 text-red-400 animate-pulse-glow" />
                        </div>
                        <h3 className="text-xl font-bold text-red-400 mb-2">Alert Sent</h3>
                        <p className="text-slate-400">Waiting for trainer acknowledgment...</p>
                      </>
                    )}

                    {alertStatus === 'acknowledged' && (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4"
                        >
                          <CheckCircle className="w-8 h-8 text-green-400" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-green-400 mb-2">Alert Acknowledged</h3>
                        <p className="text-slate-400">Trainers are responding to your location</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Alert Details */}
              <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-4">
                  <h4 className="font-medium text-slate-100 mb-3">Alert Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <Clock className="w-5 h-5 text-slate-400" />
                      <div className="flex-1">
                        <p className="text-xs text-slate-400">Sent At</p>
                        <p className="text-sm text-slate-200">
                          {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <MapPin className="w-5 h-5 text-slate-400" />
                      <div className="flex-1">
                        <p className="text-xs text-slate-400">Your Location</p>
                        <p className="text-sm text-slate-200">Zone A-3</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <Phone className="w-5 h-5 text-slate-400" />
                      <div className="flex-1">
                        <p className="text-xs text-slate-400">Response Status</p>
                        <p className="text-sm text-green-400">
                          {alertStatus === 'acknowledged'
                            ? 'Trainers responding'
                            : 'Awaiting response'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card className="bg-cyan-500/10 border-cyan-500/20">
                <CardContent className="p-4">
                  <h4 className="font-medium text-cyan-300 mb-2">What to do now</h4>
                  <ul className="space-y-2 text-sm text-cyan-400/80">
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 mt-1">•</span>
                      <span>Stay at your current location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 mt-1">•</span>
                      <span>Keep your device on and connected</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 mt-1">•</span>
                      <span>Wait for trainer instructions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Reset Button (for demo purposes) */}
              <button
                onClick={handleReset}
                className="w-full py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm"
              >
                Reset (Demo Only)
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Emergency Contacts */}
        {!alertSent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-4">
                <h3 className="font-medium text-slate-100 mb-3 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-cyan-500" />
                  Emergency Contacts
                </h3>
                <div className="space-y-2">
                  {[
                    { name: 'Command Center', number: '+1 (555) 123-4567' },
                    { name: 'Trainer Direct', number: '+1 (555) 987-6543' },
                    { name: 'Medical Support', number: '+1 (555) 246-8135' },
                  ].map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
                    >
                      <span className="text-sm text-slate-300">{contact.name}</span>
                      <span className="text-xs font-mono text-slate-400">{contact.number}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </TraineeLayout>
  );
}
