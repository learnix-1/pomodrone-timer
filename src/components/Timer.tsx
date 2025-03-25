
import React, { useMemo } from 'react';
import { useTimer } from '@/context/TimerContext';
import { formatTime, getPhaseDisplay, getPhaseColor, getProgressColor } from '@/utils/timerUtils';
import { motion } from 'framer-motion';

const Timer: React.FC = () => {
  const { seconds, phase, progress } = useTimer();
  
  const formattedTime = useMemo(() => formatTime(seconds), [seconds]);
  const phaseLabel = useMemo(() => getPhaseDisplay(phase), [phase]);
  const phaseColorClass = useMemo(() => getPhaseColor(phase), [phase]);
  const progressColorClass = useMemo(() => getProgressColor(phase), [phase]);
  
  // Calculate SVG parameters for progress ring
  const radius = 120;
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div 
        className="relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            stroke="hsl(var(--secondary))"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="opacity-30"
          />
          
          {/* Progress circle */}
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={`progress-ring-circle ${progressColorClass} transition-all duration-300`}
          />
        </svg>
        
        {/* Timer display in the center of the ring */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className={`text-6xl font-mono font-bold ${phaseColorClass} transition-colors duration-300`}
            key={formattedTime}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {formattedTime}
          </motion.span>
          
          <motion.span 
            className={`text-sm font-medium uppercase tracking-wider mt-2 ${phaseColorClass} transition-colors duration-300`}
            key={phaseLabel}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            {phaseLabel}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

export default Timer;
