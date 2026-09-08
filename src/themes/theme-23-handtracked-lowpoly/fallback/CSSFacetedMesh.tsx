import React from 'react';

interface CSSFacetedMeshProps {
  rotX: number;
  rotY: number;
  isPinching: boolean;
}

export const CSSFacetedMesh: React.FC<CSSFacetedMeshProps> = ({ rotX, rotY, isPinching }) => {
  const transform = `rotateX(${-rotY * 25}deg) rotateY(${rotX * 35}deg) scale(${isPinching ? 1.1 : 1.0})`;

  return (
    <div className="w-full h-full flex items-center justify-center [perspective:1000px]">
      <div 
        style={{ transform, transition: 'transform 0.1s ease-out' }}
        className="relative w-64 h-80 [transform-style:preserve-3d] flex items-center justify-center select-none"
      >
        {/* Facet 1: Forehead Center */}
        <div 
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            transform: 'translateZ(40px) rotateX(15deg)'
          }}
          className="absolute w-36 h-28 bg-gradient-to-tr from-[#5a36db] to-[#7952ff] border border-white/20 shadow-lg top-4"
        />

        {/* Facet 2: Left Brow */}
        <div 
          style={{
            clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)',
            transform: 'translateZ(20px) rotateY(-35deg) translateX(-30px)'
          }}
          className="absolute w-28 h-28 bg-gradient-to-br from-[#3b209e] to-[#5530cf] border border-white/20 top-8 left-4"
        />

        {/* Facet 3: Right Brow */}
        <div 
          style={{
            clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
            transform: 'translateZ(20px) rotateY(35deg) translateX(30px)'
          }}
          className="absolute w-28 h-28 bg-gradient-to-bl from-[#8862ff] to-[#6a3df5] border border-white/20 top-8 right-4"
        />

        {/* Facet 4: Nose Ridge */}
        <div 
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            transform: 'translateZ(75px) rotateX(5deg)'
          }}
          className="absolute w-20 h-32 bg-gradient-to-b from-[#00e5ff] to-[#7952ff] border border-white/30 top-24"
        />

        {/* Facet 5: Chin / Jaw */}
        <div 
          style={{
            clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
            transform: 'translateZ(30px) rotateX(-25deg)'
          }}
          className="absolute w-40 h-28 bg-gradient-to-t from-[#26136e] to-[#4524b5] border border-white/20 bottom-4"
        />

        {/* Ambient Wireframe lines */}
        <div className="absolute inset-0 border border-[#7952ff]/30 rounded-3xl pointer-events-none" />
      </div>
    </div>
  );
};
