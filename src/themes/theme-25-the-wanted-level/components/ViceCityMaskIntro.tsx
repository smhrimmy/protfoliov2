import React, { useEffect, useState } from 'react';

interface ViceCityMaskIntroProps {
  onComplete: () => void;
}

export const ViceCityMaskIntro: React.FC<ViceCityMaskIntroProps> = ({ onComplete }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    // Start animation and call onComplete after keyframes finish
    const timer = setTimeout(() => {
      setAnimating(false);
      onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!animating) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center w-screen h-screen overflow-hidden bg-black pointer-events-none select-none">
      <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <mask id="vc-svg-intro-mask">
            <rect width="100%" height="100%" fill="black" />
            <g className="animate-[vcMaskZoom_2.6s_cubic-bezier(0.85,0,0.15,1)_forwards] transform-origin-center">
              <text
                x="40%"
                y="45%"
                fontSize="110"
                textAnchor="middle"
                fill="white"
                dominantBaseline="middle"
                fontFamily="Impact, Arial Black, sans-serif"
                fontWeight="900"
              >
                PRAJWAL
              </text>
              <text
                x="62%"
                y="62%"
                fontSize="95"
                textAnchor="middle"
                fill="white"
                dominantBaseline="middle"
                fontFamily="Impact, Arial Black, sans-serif"
                fontWeight="900"
              >
                VICE CITY
              </text>
            </g>
          </mask>
        </defs>

        {/* Masked Background Image revealing penthouse command center */}
        <image
          href="/themes/theme-25/background-desk.jpg"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#vc-svg-intro-mask)"
        />
      </svg>
    </div>
  );
};
