"use client";

import { useState, useEffect } from "react";
import { Progress } from "~/components/ui/progress";

interface ProgressBarProps {
  lastUpdatedAt: Date | null;
}

export const dynamic = "force-dynamic";

export function ProgressBar({ lastUpdatedAt }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (lastUpdatedAt) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 99) {
            return 99;
          }
          return prevProgress + (100 - prevProgress) * 0.01;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [lastUpdatedAt]);

  if (!lastUpdatedAt) return null;

  return (
    <div className="w-full">
      Last updated at: {lastUpdatedAt.toLocaleString()}
      <Progress value={progress} className="mt-2 w-full" />
    </div>
  );
}
