import React, { useEffect, useRef } from 'react';

interface ShaderGradientBackdropProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  grainOpacity?: number;
  className?: string;
}

export const ShaderGradientBackdrop: React.FC<ShaderGradientBackdropProps> = ({
  color1 = '#070914',
  color2 = '#1a0933',
  color3 = '#00ffff',
  speed = 0.005,
  grainOpacity = 0.08,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += speed;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Moving gradient mesh centers
      const cx1 = w * (0.5 + 0.3 * Math.sin(time));
      const cy1 = h * (0.4 + 0.2 * Math.cos(time * 0.8));

      const cx2 = w * (0.6 + 0.3 * Math.cos(time * 1.2));
      const cy2 = h * (0.6 + 0.3 * Math.sin(time * 0.9));

      // Base background
      ctx.fillStyle = color1;
      ctx.fillRect(0, 0, w, h);

      // Gradient Spot 1
      const grad1 = ctx.createRadialGradient(cx1, cy1, 10, cx1, cy1, Math.max(w, h) * 0.7);
      grad1.addColorStop(0, color2);
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.globalCompositeOperation = 'screen';
      ctx.fillRect(0, 0, w, h);

      // Gradient Spot 2
      const grad2 = ctx.createRadialGradient(cx2, cy2, 10, cx2, cy2, Math.max(w, h) * 0.6);
      grad2.addColorStop(0, color3);
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.globalAlpha = 0.35;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [color1, color2, color3, speed]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Subtle Grain Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: grainOpacity,
          backgroundImage: 'repeating-radial-gradient(circle at 50% 50%, #fff, #fff 1px, transparent 1px, transparent 2px)',
          backgroundSize: '3px 3px'
        }}
      />
    </div>
  );
};
