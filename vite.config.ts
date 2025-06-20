import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ⚙️ Simple Vite recipe for React + TS + SCSS modules
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase' // .class-name -> className
    }
  }
});
