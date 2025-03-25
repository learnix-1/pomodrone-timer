
/**
 * Format seconds into a MM:SS string
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Get the phase name for display
 */
export const getPhaseDisplay = (phase: string): string => {
  switch (phase) {
    case 'work':
      return 'Focus';
    case 'shortBreak':
      return 'Short Break';
    case 'longBreak':
      return 'Long Break';
    default:
      return 'Ready';
  }
};

/**
 * Get status color based on current phase
 */
export const getPhaseColor = (phase: string): string => {
  switch (phase) {
    case 'work':
      return 'text-red-500';
    case 'shortBreak':
      return 'text-green-500';
    case 'longBreak':
      return 'text-blue-500';
    default:
      return 'text-gray-500';
  }
};

/**
 * Get progress ring color based on current phase
 */
export const getProgressColor = (phase: string): string => {
  switch (phase) {
    case 'work':
      return 'stroke-red-500';
    case 'shortBreak':
      return 'stroke-green-500';
    case 'longBreak':
      return 'stroke-blue-500';
    default:
      return 'stroke-gray-400';
  }
};
