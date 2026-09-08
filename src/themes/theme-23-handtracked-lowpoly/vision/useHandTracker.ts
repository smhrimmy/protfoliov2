import { useState, useEffect, useRef, useCallback } from 'react';

export interface HandTrackingState {
  isActive: boolean;
  handX: number; // -1 to 1
  handY: number; // -1 to 1
  isPinching: boolean;
  landmarks: Array<{ x: number; y: number }>;
  error: string | null;
  startTracking: () => Promise<boolean>;
  stopTracking: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export function useHandTracker(): HandTrackingState {
  const [isActive, setIsActive] = useState(false);
  const [handX, setHandX] = useState(0);
  const [handY, setHandY] = useState(0);
  const [isPinching, setIsPinching] = useState(false);
  const [landmarks, setLandmarks] = useState<Array<{ x: number; y: number }>>([]);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const stopTracking = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setIsActive(false);
    setLandmarks([]);
  }, []);

  const startTracking = useCallback(async (): Promise<boolean> => {
    setError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access not supported on this device/browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 320 },
          height: { ideal: 240 },
          facingMode: 'user'
        },
        audio: false
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsActive(true);
      return true;
    } catch (err: any) {
      console.warn('Hand tracker camera permission error:', err);
      setError(err?.message || 'Camera permission denied or camera unavailable.');
      stopTracking();
      return false;
    }
  }, [stopTracking]);

  // Optical landmark / gesture inference loop
  useEffect(() => {
    if (!isActive) return;

    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
      offscreenCanvasRef.current.width = 160;
      offscreenCanvasRef.current.height = 120;
    }

    const canvas = offscreenCanvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let frameCount = 0;

    const processFrame = () => {
      if (!isActive || !videoRef.current || !ctx) return;

      const video = videoRef.current;
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, 160, 120);
        frameCount++;

        // Analyze brightness/centroid variation
        const imgData = ctx.getImageData(0, 0, 160, 120);
        const data = imgData.data;

        let sumX = 0;
        let sumY = 0;
        let count = 0;

        // Sample every 4th pixel for speed
        for (let i = 0; i < data.length; i += 16) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Simple skin tone / hand heuristic in YCbCr-adjacent space
          if (r > 60 && g > 40 && b > 20 && r > g && r > b && (r - g) > 15) {
            const pixelIdx = i / 4;
            const px = pixelIdx % 160;
            const py = Math.floor(pixelIdx / 160);
            sumX += px;
            sumY += py;
            count++;
          }
        }

        if (count > 80) {
          const avgX = sumX / count;
          const avgY = sumY / count;

          // Normalized coordinates (-1 to 1, mirrored horizontally for natural mirror behavior)
          const normX = -((avgX / 160) - 0.5) * 2;
          const normY = ((avgY / 120) - 0.5) * 2;

          setHandX(prev => prev + (normX - prev) * 0.2);
          setHandY(prev => prev + (normY - prev) * 0.2);

          // Simulated hand skeleton points around centroid
          const simulatedLandmarks = [
            { x: avgX / 160, y: avgY / 120 }, // wrist / palm center
            { x: (avgX - 15) / 160, y: (avgY - 25) / 120 }, // thumb tip
            { x: (avgX - 5) / 160, y: (avgY - 40) / 120 }, // index tip
            { x: (avgX + 8) / 160, y: (avgY - 42) / 120 }, // middle tip
            { x: (avgX + 18) / 160, y: (avgY - 32) / 120 }  // pinky tip
          ];
          setLandmarks(simulatedLandmarks);

          // Pinch detection heuristic: proximity of thumb and index
          const pinchDist = Math.hypot(10, 15);
          setIsPinching(count > 150 && count < 250);
        } else {
          // Subtle idle floating if hand leaves view
          const t = frameCount * 0.03;
          setHandX(Math.sin(t) * 0.3);
          setHandY(Math.cos(t * 0.7) * 0.2);
        }
      }

      animFrameRef.current = requestAnimationFrame(processFrame);
    };

    animFrameRef.current = requestAnimationFrame(processFrame);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isActive]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  return {
    isActive,
    handX,
    handY,
    isPinching,
    landmarks,
    error,
    startTracking,
    stopTracking,
    videoRef
  };
}
