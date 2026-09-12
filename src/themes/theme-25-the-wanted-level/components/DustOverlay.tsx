import React from "react";

export const DustOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[4] overflow-hidden opacity-30 mix-blend-screen">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 60%)`
        }}
      />
    </div>
  );
};
