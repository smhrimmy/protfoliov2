import React, { useState, useEffect } from 'react';
import { Sparkles, X, ChevronRight, Check } from 'lucide-react';

interface OnboardingTourProps {
  onComplete: () => void;
}

const TOUR_STEPS = [
  {
    title: 'Welcome to PDL Portfolio OS',
    description: 'This is a creative operating system engineered for Prajwal DL. You have full CMS control, 19 isolated themes, a visual editor, and automated social distribution.',
    target: 'Welcome'
  },
  {
    title: 'Draft vs. Live State',
    description: 'Content lifecycle is strictly enforced: Edit → Autosave → Preview → Review → Approve → Publish. Draft changes never alter the live public portfolio until you explicitly publish.',
    target: 'Lifecycle'
  },
  {
    title: '19 Structurally Distinct Themes',
    description: 'Browse the Theme Selector in Admin → Themes. Every theme features its own layout architecture, navigation pattern, and grid system — not just a different color skin.',
    target: 'Themes'
  },
  {
    title: 'Global Command Palette',
    description: 'Press Cmd+K or Ctrl+K anywhere to jump between routes, draft posts, or trigger actions instantly.',
    target: 'Shortcuts'
  }
];

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < TOUR_STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      localStorage.setItem('pdl_tour_completed', 'true');
      onComplete();
    }
  };

  const handleSkip = () => {
    localStorage.setItem('pdl_tour_completed', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-blue-500/30 rounded-2xl w-full max-w-md shadow-2xl p-6 text-white relative animate-in zoom-in-95 duration-150">
        <button onClick={handleSkip} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
          <Sparkles className="w-5 h-5" />
        </div>

        <div className="flex items-center gap-1.5 mb-2">
          {TOUR_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? 'w-6 bg-blue-500' : i < step ? 'w-2 bg-blue-400/50' : 'w-2 bg-white/10'
              }`}
            />
          ))}
        </div>

        <h3 className="text-lg font-bold text-white mb-2">{TOUR_STEPS[step].title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-6">{TOUR_STEPS[step].description}</p>

        <div className="flex items-center justify-between">
          <button onClick={handleSkip} className="text-xs text-gray-500 hover:text-gray-300">
            Skip Tour
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20"
          >
            {step === TOUR_STEPS.length - 1 ? (
              <>Get Started <Check className="w-4 h-4" /></>
            ) : (
              <>Next <ChevronRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
