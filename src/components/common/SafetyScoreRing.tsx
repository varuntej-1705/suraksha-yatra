import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, AlertTriangle, AlertOctagon, Info } from 'lucide-react';

interface SafetyScoreRingProps {
  score: number;
  size?: number;
  showBreakdownToggle?: boolean;
  onOpenFactors?: () => void;
}

export const SafetyScoreRing: React.FC<SafetyScoreRingProps> = ({
  score,
  size = 140,
  showBreakdownToggle = true,
  onOpenFactors
}) => {
  const { tourist, t } = useApp();

  // SVG calculations
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Semantic color selection
  const getColor = () => {
    if (score >= 80) return '#4ADE80'; // Green
    if (score >= 60) return '#F5C84C'; // Yellow
    if (score >= 35) return '#F59E0B'; // Orange
    return '#FF4D4D'; // Red Critical
  };

  const getTierLabel = () => {
    if (score >= 80) return t('youAreSafe') || 'YOU ARE SAFE';
    if (score >= 60) return t('cautionAdvisory') || 'EXERCISE CAUTION';
    if (score >= 35) return t('highRiskWarning') || 'HIGH RISK WARNING';
    return t('criticalEmergency') || 'CRITICAL EMERGENCY';
  };

  const getStatusIcon = () => {
    if (score >= 80) return <ShieldCheck className="w-4 h-4 text-[var(--color-safe)]" />;
    if (score >= 60) return <AlertTriangle className="w-4 h-4 text-[var(--color-moderate)]" />;
    if (score >= 35) return <AlertTriangle className="w-4 h-4 text-[var(--color-high)]" />;
    return <AlertOctagon className="w-4 h-4 text-[var(--color-critical)]" />;
  };

  const color = getColor();

  return (
    <div id="safety-score-gauge" className="flex flex-col items-center justify-center p-3">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Ambient Glow */}
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-30 transition-all duration-700 pointer-events-none"
          style={{ backgroundColor: color }}
        />

        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Value Stroke */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Inner Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] font-mono">
            {score}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] font-medium tracking-wider uppercase">
            / 100
          </span>
        </div>
      </div>

      {/* Status Pill Badge */}
      <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 shadow-sm">
        {getStatusIcon()}
        <span className="text-xs font-bold tracking-wide" style={{ color }}>
          {getTierLabel()}
        </span>
      </div>

      {showBreakdownToggle && onOpenFactors && (
        <button
          onClick={onOpenFactors}
          className="mt-2 text-[11px] text-[var(--text-secondary)] hover:text-white flex items-center gap-1 underline underline-offset-2 transition-colors"
        >
          <Info className="w-3 h-3 text-[#A78BFA]" />
          <span>Explain Risk Factors</span>
        </button>
      )}
    </div>
  );
};
