import React, { useEffect, useRef } from "react";
import { useTheme25Era } from "../context/Theme25EraContext";

interface Particle {
  type: "rain" | "dust" | "fog";
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  length: number;
  color: string;
}

export const WeatherOverlay: React.FC = () => {
  const { era, tokens } = useTheme25Era();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const initParticles = () => {
      particles = [];
      const currentEra = era;
      
      if (currentEra === "gta-vice-city" || currentEra === "neon-retro") {
        // Tropical Vice City Synthwave Rain & Neon Dust
        for (let i = 0; i < 180; i++) {
          particles.push({
            type: "rain",
            x: Math.random() * width,
            y: Math.random() * height,
            speedX: 2 + Math.random() * 3,
            speedY: 14 + Math.random() * 18,
            size: 1.2,
            length: 22 + Math.random() * 25,
            color: "rgba(236, 72, 153, 0.45)"
          });
        }
      } else if (currentEra === "gta-san-andreas" || currentEra === "sun-belt") {
        // San Andreas Heat Haze Floating Dust
        for (let i = 0; i < 110; i++) {
          particles.push({
            type: "dust",
            x: Math.random() * width,
            y: Math.random() * height,
            speedX: -1 + Math.random() * 2,
            speedY: -0.5 - Math.random() * 1,
            size: 1 + Math.random() * 3,
            length: 0,
            color: "rgba(245, 158, 11, 0.5)"
          });
        }
      } else if (currentEra === "gta-iv") {
        // GTA IV Gritty Industrial Rain & Fog
        for (let i = 0; i < 160; i++) {
          particles.push({
            type: "rain",
            x: Math.random() * width,
            y: Math.random() * height,
            speedX: 1 + Math.random() * 1.5,
            speedY: 20 + Math.random() * 10,
            size: 1,
            length: 15 + Math.random() * 15,
            color: "rgba(180, 180, 180, 0.5)"
          });
        }
      } else {
        // GTA V / VI Neon Cyber Haze
        for (let i = 0; i < 90; i++) {
          particles.push({
            type: "dust",
            x: Math.random() * width,
            y: Math.random() * height,
            speedX: 0.5 + Math.random() * 1.5,
            speedY: 0.5 + Math.random() * 1.5,
            size: 1.5 + Math.random() * 2,
            length: 0,
            color: tokens.accentColor
          });
        }
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (p.type === "rain") {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX, p.y + p.length);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.stroke();

          p.x += p.speedX;
          p.y += p.speedY;

          if (p.y > height) {
            p.y = -p.length;
            p.x = Math.random() * width;
          }
          if (p.x > width) p.x = 0;
        } else if (p.type === "dust") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          p.x += p.speedX;
          p.y += p.speedY;

          if (p.y < 0) p.y = height;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [era, tokens]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
