
import React, { useState } from 'react';
import { TimerProvider } from '@/context/TimerContext';
import Timer from '@/components/Timer';
import Controls from '@/components/Controls';
import Settings from '@/components/Settings';
import { motion } from 'framer-motion';

const Index = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <TimerProvider>
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-secondary/30">
        <motion.div 
          className="w-full max-w-md mx-auto flex flex-col items-center neo-blur px-8 py-12 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-xl font-semibold mb-8 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Pomodoro Timer
          </motion.h1>
          
          <Timer />
          
          <Controls onSettingsClick={() => setSettingsOpen(true)} />
          
          <Settings 
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
          />
        </motion.div>
        
        <motion.footer 
          className="mt-8 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Stay focused, manage your time wisely
        </motion.footer>
      </div>
    </TimerProvider>
  );
};

export default Index;
