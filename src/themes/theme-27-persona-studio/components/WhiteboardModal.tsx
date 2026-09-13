import React, { useRef, useState, useEffect } from 'react';

interface WhiteboardModalProps {
  onClose: () => void;
}

export const WhiteboardModal: React.FC<WhiteboardModalProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FDCA3D');
  const [brushSize, setBrushSize] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high resolution canvas dimensions
    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = 400;

    // Fill canvas background
    ctx.fillStyle = '#10162E';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#10162E';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="persona-modal-overlay">
      <div className="persona-modal-card max-w-3xl w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold font-display">Interactive Visitor Whiteboard</h2>
            <p className="text-sm opacity-70">Sketch your ideas, notes, or messages on the city whiteboard.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center font-bold text-xl"
          >
            &times;
          </button>
        </div>

        {/* Canvas Area */}
        <div className="w-full rounded-2xl overflow-hidden border-2 border-black/20 mb-6 bg-[#10162E]">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full cursor-crosshair block"
          />
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider opacity-70">Color:</span>
            {['#FDCA3D', '#34BFFF', '#FF6B6B', '#51CF66', '#FFFFFF'].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full border-2 transition-transform ${color === c ? 'scale-110 border-black' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider opacity-70">Size:</span>
            <input 
              type="range" 
              min="2" 
              max="20" 
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-24 accent-[#FDCA3D]"
            />
          </div>

          <button 
            onClick={clearCanvas}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            Clear Board
          </button>
        </div>
      </div>
    </div>
  );
};
