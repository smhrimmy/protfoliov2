import React, { useEffect, useRef } from 'react';
import { Camera, X, Hand, Radio } from 'lucide-react';

interface DeviceFramePreviewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isActive: boolean;
  isPinching: boolean;
  landmarks: Array<{ x: number; y: number }>;
  onStop: () => void;
}

export const DeviceFramePreview: React.FC<DeviceFramePreviewProps> = ({
  videoRef,
  isActive,
  isPinching,
  landmarks,
  onStop
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !isActive) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (landmarks.length > 0) {
      // Draw bones/connections
      ctx.strokeStyle = isPinching ? '#00ff88' : '#7952ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      landmarks.forEach((pt, i) => {
        const px = pt.x * canvas.width;
        const py = pt.y * canvas.height;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // Draw landmark dots
      landmarks.forEach(pt => {
        const px = pt.x * canvas.width;
        const py = pt.y * canvas.height;
        ctx.fillStyle = isPinching ? '#00ff88' : '#00e5ff';
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }, [isActive, isPinching, landmarks]);

  if (!isActive) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 w-52 sm:w-60 bg-[#0f111a] rounded-[28px] border-2 border-[#7952ff]/60 p-2 shadow-2xl shadow-[#7952ff]/30 space-y-2 animate-in slide-in-from-bottom-6">
      
      {/* Phone Camera Notch & Header */}
      <div className="flex items-center justify-between px-2 pt-1">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00ff88]">
          <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
          <span>VISION_LINK</span>
        </div>
        <button
          onClick={onStop}
          className="px-2 py-0.5 rounded-full bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-colors"
          title="Stop Camera Stream"
        >
          <X className="w-3 h-3" />
          <span>Stop</span>
        </button>
      </div>

      {/* Video & Tracking Canvas Viewport */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-white/10">
        <video
          ref={videoRef}
          playsInline
          muted
          className="w-full h-full object-cover -scale-x-100 opacity-70"
        />
        <canvas
          ref={canvasRef}
          width={240}
          height={180}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Dynamic Island / Status Chip inside video */}
        <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-black/80 backdrop-blur-xs text-[9px] font-mono text-center flex items-center justify-center gap-1.5">
          <Hand className="w-3 h-3 text-[#7952ff]" />
          <span className={isPinching ? 'text-[#00ff88] font-bold' : 'text-gray-300'}>
            {isPinching ? 'GESTURE: PINCH ACTIVE' : 'HAND DETECTED: ROTATING'}
          </span>
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="text-[9px] font-mono text-gray-400 text-center px-1">
        Move hand to fold & rotate mesh
      </div>
    </div>
  );
};
