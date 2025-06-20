/* Shared SCSS variables for light + dark themes */
// Context toggling -- saves preference in localStorage
import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeCtx {
      theme: 'light' | 'dark';
      toggle: () => void;
}

const Ctx = createContext<ThemeCtx>({ theme: 'light', toggle: () => { } });

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [theme, setTheme] = useState<'light' | 'dark'>('light');

      // Load persisted choice
      useEffect(() => {
            const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
            if (saved) setTheme(saved);
      }, []);

      // Re-apply data-attribute when state changes
      useEffect(() => {
            document.documentElement.dataset.theme = theme;
            localStorage.setItem('theme', theme);
      }, [theme]);

      const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

      return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
};

export const useTheme = () => useContext(Ctx);
