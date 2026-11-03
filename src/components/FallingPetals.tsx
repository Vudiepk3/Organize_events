import React, { useMemo } from 'react';

interface FallingPetalsProps {
  enabled: boolean;
}

interface PetalItem {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  rotation: number;
  colorType: 'rose' | 'cherry' | 'gold';
}

export const FallingPetals: React.FC<FallingPetalsProps> = ({ enabled }) => {
  const petals = useMemo<PetalItem[]>(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 8 + Math.random() * 10,
      size: 14 + Math.random() * 18,
      drift: -60 + Math.random() * 140,
      rotation: 180 + Math.random() * 540,
      colorType: i % 4 === 0 ? 'gold' : i % 2 === 0 ? 'rose' : 'cherry',
    }));
  }, []);

  if (!enabled) return null;

  return (
    <div 
      className="pointer-events-none fixed inset-0 overflow-hidden z-20"
      aria-hidden="true"
    >
      {petals.map((petal) => {
        let bgGradient = 'linear-gradient(135deg, #FFB7B2 0%, #E87A90 100%)';
        if (petal.colorType === 'gold') {
          bgGradient = 'linear-gradient(135deg, #FDE68A 0%, #D4AF37 100%)';
        } else if (petal.colorType === 'cherry') {
          bgGradient = 'linear-gradient(135deg, #FFE4E6 0%, #FDA4AF 100%)';
        }

        return (
          <div
            key={petal.id}
            style={{
              position: 'absolute',
              left: `${petal.left}%`,
              top: '-40px',
              width: `${petal.size}px`,
              height: `${petal.size * 1.3}px`,
              background: bgGradient,
              borderRadius: '50% 0% 50% 50%',
              filter: 'drop-shadow(0 2px 4px rgba(225, 29, 72, 0.15))',
              opacity: 0.85,
              animationName: 'petalFall',
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              ['--tw-petal-drift' as any]: `${petal.drift}px`,
              ['--tw-petal-rot' as any]: `${petal.rotation}deg`,
            }}
          />
        );
      })}
    </div>
  );
};
