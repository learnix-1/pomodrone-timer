
import React from 'react';
import { useTimer } from '@/context/TimerContext';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, SkipForward, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface ControlsProps {
  onSettingsClick: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onSettingsClick }) => {
  const { isActive, startTimer, pauseTimer, resetTimer, skipToNextPhase } = useTimer();

  return (
    <motion.div 
      className="flex items-center justify-center gap-4 mt-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {!isActive ? (
        <Button 
          onClick={startTimer} 
          size="lg" 
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-md"
        >
          <Play className="h-6 w-6" />
          <span className="sr-only">Start</span>
        </Button>
      ) : (
        <Button 
          onClick={pauseTimer} 
          size="lg" 
          className="rounded-full w-14 h-14 bg-red-500 hover:bg-red-600 shadow-md"
        >
          <Pause className="h-6 w-6" />
          <span className="sr-only">Pause</span>
        </Button>
      )}
      
      <Button 
        onClick={resetTimer} 
        size="icon" 
        variant="outline" 
        className="rounded-full w-10 h-10"
        title="Reset Timer"
      >
        <RotateCcw className="h-4 w-4" />
        <span className="sr-only">Reset</span>
      </Button>
      
      <Button 
        onClick={skipToNextPhase} 
        size="icon" 
        variant="outline" 
        className="rounded-full w-10 h-10"
        title="Skip to Next Phase"
      >
        <SkipForward className="h-4 w-4" />
        <span className="sr-only">Skip</span>
      </Button>
      
      <Button 
        onClick={onSettingsClick} 
        size="icon" 
        variant="outline" 
        className="rounded-full w-10 h-10"
        title="Settings"
      >
        <Settings className="h-4 w-4" />
        <span className="sr-only">Settings</span>
      </Button>
    </motion.div>
  );
};

export default Controls;
