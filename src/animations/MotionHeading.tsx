import React from 'react';
import { motion } from 'motion/react';
import { useThemeAnimation } from './useThemeAnimation';
import type { MotionHeadingProps } from './types';

export const MotionHeading: React.FC<MotionHeadingProps> = ({
  children,
  themeId,
  className = '',
  as = 'h2',
  subtitle,
}) => {
  const { flavor, isReducedMotion } = useThemeAnimation({ themeId });
  const text = typeof children === 'string' ? children : '';

  // Typewriter character reveal for Terminal Dev (Theme 01)
  if (flavor.number === '01' && text && !isReducedMotion) {
    const letters = Array.from(text);
    return (
      <div className="space-y-1">
        <motion.h2
          aria-label={text}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`font-mono flex items-center flex-wrap ${className}`}
        >
          <span className="text-emerald-400 mr-2">$</span>
          {letters.map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, display: 'none' },
                visible: { opacity: 1, display: 'inline' },
              }}
              transition={{ delay: i * 0.035, duration: 0.01 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2.5 h-4 bg-emerald-400 ml-1 translate-y-0.5"
          />
        </motion.h2>
        {subtitle && (
          <p className="text-xs font-mono text-gray-400">// {subtitle}</p>
        )}
      </div>
    );
  }

  // Scanline wipe for Cyberpunk (Theme 02)
  if (flavor.number === '02' && !isReducedMotion) {
    return (
      <div className="space-y-1">
        <motion.div
          initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={className}
        >
          {React.createElement(as, { className: 'tracking-tight font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500' }, children)}
        </motion.div>
        {subtitle && (
          <p className="text-xs font-mono text-cyan-400 tracking-wider">[SYS_STATUS: ACTIVE] {subtitle}</p>
        )}
      </div>
    );
  }

  // Draft-line reveal for Mechanical Blueprint (Theme 16)
  if (flavor.number === '16' && !isReducedMotion) {
    return (
      <div className="space-y-1">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={className}
        >
          {React.createElement(as, { className: 'font-mono text-cyan-300 font-bold uppercase tracking-wider' }, children)}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[1px] bg-cyan-400/50 origin-left mt-1 border-b border-dashed border-cyan-400"
          />
        </motion.div>
        {subtitle && (
          <p className="text-[11px] font-mono text-cyan-500">SPEC // {subtitle}</p>
        )}
      </div>
    );
  }

  // Default Standard Reveal (Editorial, Wanted Level, etc.)
  const Component = (motion as any)[as] || motion.h2;

  return (
    <div className="space-y-1">
      <Component
        initial={{ opacity: 0, y: isReducedMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </Component>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-xs text-gray-400 font-mono"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
