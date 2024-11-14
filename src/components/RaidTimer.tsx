import React from 'react';

interface RaidTimerProps {
  lastRaid: number;
}

export const RaidTimer: React.FC<RaidTimerProps> = ({ lastRaid }) => {
  const [timeLeft, setTimeLeft] = React.useState<number>(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const nextRaid = lastRaid + 60000; // 60 seconds
      const remaining = Math.max(0, (nextRaid - now) / 1000);
      setTimeLeft(remaining);
    }, 100);

    return () => clearInterval(interval);
  }, [lastRaid]);

  const progressWidth = `${(timeLeft / 60) * 100}%`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-red-400">Next Raid</h3>
          <span className="text-white">{Math.ceil(timeLeft)}s</span>
        </div>
        <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-200"
            style={{ width: progressWidth }}
          />
        </div>
      </div>
    </div>
  );
};