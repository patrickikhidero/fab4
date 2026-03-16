import React from "react";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function CircularProgress({
  percentage,
  size = 41,
  strokeWidth = 3,
  className = "",
}: CircularProgressProps) {
  // Clamp percentage between 0 and 100
  const progress = Math.min(Math.max(percentage, 0), 100);
  
  // Calculate radius and circumference
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate stroke-dashoffset (how much of the circle to show)
  const offset = circumference - (progress / 100) * circumference;
  
  // Center point
  const center = size / 2;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Background circle (unfilled - light gray/white) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(39, 38, 53, 0.1)"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle (filled - green) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#198754"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      
      {/* Percentage text in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[#272635] text-xs font-medium">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
