import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme25Era, EraTokens, ERA_CONFIGS } from '../types/eras';

interface Theme25EraContextType {
  era: Theme25Era;
  tokens: EraTokens;
  setEra: (era: Theme25Era) => void;
}

const STORAGE_KEY = 'pdl_theme25_era';

const Theme25EraContext = createContext<Theme25EraContextType>({
  era: 'neon-retro',
  tokens: ERA_CONFIGS['neon-retro'],
  setEra: () => {}
});

export const Theme25EraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [era, setEraState] = useState<Theme25Era>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme25Era;
      if (saved && ERA_CONFIGS[saved]) {
        return saved;
      }
    }
    return 'neon-retro';
  });

  const setEra = (newEra: Theme25Era) => {
    setEraState(newEra);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newEra);
    }
  };

  const tokens = ERA_CONFIGS[era] || ERA_CONFIGS['neon-retro'];

  return (
    <Theme25EraContext.Provider value={{ era, tokens, setEra }}>
      {children}
    </Theme25EraContext.Provider>
  );
};

export const useTheme25Era = () => useContext(Theme25EraContext);
