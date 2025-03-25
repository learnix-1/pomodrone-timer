import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

type TimerPhase = "work" | "shortBreak" | "longBreak" | "idle";

interface TimerContextType {
  seconds: number;
  isActive: boolean;
  phase: TimerPhase;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  completedWorkIntervals: number;
  progress: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipToNextPhase: () => void;
  updateWorkDuration: (duration: number) => void;
  updateShortBreakDuration: (duration: number) => void;
  updateLongBreakDuration: (duration: number) => void;
  updateLongBreakInterval: (interval: number) => void;
}

const defaultWorkDuration = 25 * 60; // 25 minutes in seconds
const defaultShortBreakDuration = 5 * 60; // 5 minutes in seconds
const defaultLongBreakDuration = 15 * 60; // 15 minutes in seconds
const defaultLongBreakInterval = 4; // After 4 work sessions

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seconds, setSeconds] = useState(defaultWorkDuration);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<TimerPhase>("idle");
  const [workDuration, setWorkDuration] = useState(defaultWorkDuration);
  const [shortBreakDuration, setShortBreakDuration] = useState(defaultShortBreakDuration);
  const [longBreakDuration, setLongBreakDuration] = useState(defaultLongBreakDuration);
  const [longBreakInterval, setLongBreakInterval] = useState(defaultLongBreakInterval);
  const [completedWorkIntervals, setCompletedWorkIntervals] = useState(0);
  const [progress, setProgress] = useState(100);

  const getDurationForPhase = useCallback((phase: TimerPhase) => {
    switch (phase) {
      case "work":
        return workDuration;
      case "shortBreak":
        return shortBreakDuration;
      case "longBreak":
        return longBreakDuration;
      default:
        return workDuration;
    }
  }, [workDuration, shortBreakDuration, longBreakDuration]);

  const resetTimerForPhase = useCallback((phase: TimerPhase) => {
    const duration = getDurationForPhase(phase);
    setSeconds(duration);
    setProgress(100);
  }, [getDurationForPhase]);

  const startTimer = useCallback(() => {
    if (phase === "idle") {
      setPhase("work");
      resetTimerForPhase("work");
    }
    setIsActive(true);
  }, [phase, resetTimerForPhase]);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    pauseTimer();
    setPhase("idle");
    setCompletedWorkIntervals(0);
    resetTimerForPhase("work");
  }, [pauseTimer, resetTimerForPhase]);

  const skipToNextPhase = useCallback(() => {
    if (phase === "idle" || phase === "work") {
      const nextWorkIntervals = phase === "work" ? completedWorkIntervals + 1 : completedWorkIntervals;
      setCompletedWorkIntervals(nextWorkIntervals);
      
      const isLongBreak = nextWorkIntervals > 0 && nextWorkIntervals % longBreakInterval === 0;
      const nextPhase: TimerPhase = isLongBreak ? "longBreak" : "shortBreak";
      
      setPhase(nextPhase);
      resetTimerForPhase(nextPhase);
    } else {
      setPhase("work");
      resetTimerForPhase("work");
    }
  }, [phase, completedWorkIntervals, longBreakInterval, resetTimerForPhase]);

  const updateWorkDuration = useCallback((duration: number) => {
    setWorkDuration(duration * 60);
    if (phase === "idle" || phase === "work") {
      resetTimerForPhase("work");
    }
  }, [phase, resetTimerForPhase]);

  const updateShortBreakDuration = useCallback((duration: number) => {
    setShortBreakDuration(duration * 60);
    if (phase === "shortBreak") {
      resetTimerForPhase("shortBreak");
    }
  }, [phase, resetTimerForPhase]);

  const updateLongBreakDuration = useCallback((duration: number) => {
    setLongBreakDuration(duration * 60);
    if (phase === "longBreak") {
      resetTimerForPhase("longBreak");
    }
  }, [phase, resetTimerForPhase]);

  const updateLongBreakInterval = useCallback((interval: number) => {
    setLongBreakInterval(interval);
  }, []);

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && seconds > 0) {
      interval = window.setInterval(() => {
        setSeconds((prevSeconds) => {
          const newValue = prevSeconds - 1;
          const currentDuration = getDurationForPhase(phase);
          const newProgress = (newValue / currentDuration) * 100;
          setProgress(newProgress);
          return newValue;
        });
      }, 1000);
    } else if (isActive && seconds === 0) {
      setIsActive(false);
      
      const notificationTitle = phase === "work" 
        ? "Work session completed!" 
        : "Break time over!";
      
      const notificationMessage = phase === "work"
        ? "Great job! Take a break."
        : "Time to get back to work!";
      
      toast(notificationTitle, {
        description: notificationMessage,
      });

      const audio = new Audio("/notification.mp3");
      audio.play().catch((e) => console.error("Error playing sound:", e));
      
      skipToNextPhase();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, phase, getDurationForPhase, skipToNextPhase]);

  return (
    <TimerContext.Provider
      value={{
        seconds,
        isActive,
        phase,
        workDuration,
        shortBreakDuration,
        longBreakDuration,
        longBreakInterval,
        completedWorkIntervals,
        progress,
        startTimer,
        pauseTimer,
        resetTimer,
        skipToNextPhase,
        updateWorkDuration,
        updateShortBreakDuration,
        updateLongBreakDuration,
        updateLongBreakInterval
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
