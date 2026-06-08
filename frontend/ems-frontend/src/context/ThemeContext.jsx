import { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

const ThemeContext = createContext();

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    localStorage.setItem('theme', next);
  };

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: { main: '#6366F1' },
        secondary: { main: '#EC4899' },
        background: {
          default: mode === 'dark' ? '#0F172A' : '#F8FAFC',
          paper: mode === 'dark' ? '#1E293B' : '#FFFFFF',
        },
      },
      typography: {
        fontFamily: "'Inter', sans-serif",
      },
      shape: { borderRadius: 12 },
    }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);