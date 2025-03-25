
import React from 'react';
import { useTimer } from '@/context/TimerContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { 
    workDuration, 
    shortBreakDuration, 
    longBreakDuration, 
    longBreakInterval,
    updateWorkDuration,
    updateShortBreakDuration,
    updateLongBreakDuration,
    updateLongBreakInterval
  } = useTimer();

  // Convert seconds to minutes for the UI
  const workMinutes = Math.floor(workDuration / 60);
  const shortBreakMinutes = Math.floor(shortBreakDuration / 60);
  const longBreakMinutes = Math.floor(longBreakDuration / 60);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] rounded-xl neo-blur">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Settings</DialogTitle>
          <DialogDescription>
            Customize your timer durations to match your workflow.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="work-duration" className="text-sm font-medium">
                Work Duration
              </Label>
              <span className="text-sm font-mono">{workMinutes} min</span>
            </div>
            <Slider 
              id="work-duration"
              min={1}
              max={60}
              step={1}
              value={[workMinutes]}
              onValueChange={(value) => updateWorkDuration(value[0])}
              className="py-2"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="short-break" className="text-sm font-medium">
                Short Break
              </Label>
              <span className="text-sm font-mono">{shortBreakMinutes} min</span>
            </div>
            <Slider 
              id="short-break"
              min={1}
              max={15}
              step={1}
              value={[shortBreakMinutes]}
              onValueChange={(value) => updateShortBreakDuration(value[0])}
              className="py-2"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="long-break" className="text-sm font-medium">
                Long Break
              </Label>
              <span className="text-sm font-mono">{longBreakMinutes} min</span>
            </div>
            <Slider 
              id="long-break"
              min={5}
              max={30}
              step={1}
              value={[longBreakMinutes]}
              onValueChange={(value) => updateLongBreakDuration(value[0])}
              className="py-2"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="long-break-interval" className="text-sm font-medium">
                Long Break After
              </Label>
              <span className="text-sm font-mono">{longBreakInterval} sessions</span>
            </div>
            <Slider 
              id="long-break-interval"
              min={1}
              max={8}
              step={1}
              value={[longBreakInterval]}
              onValueChange={(value) => updateLongBreakInterval(value[0])}
              className="py-2"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
