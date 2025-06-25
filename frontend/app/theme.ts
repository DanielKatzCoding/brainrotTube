import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8ecae6', // Soft blue
      contrastText: '#121212',
    },
    secondary: {
      main: '#ffb4a2', // Soft coral
      contrastText: '#121212',
    },
    background: {
      default: 'rgba(11, 14, 19, 1)', // Deep dark
      paper: 'rgba(30, 30, 40, 0.7)', // Semi-transparent for glass effect
    },
    text: {
      primary: '#f1f1f1',
      secondary: '#b0b0b0',
      disabled: '#666a73',
    },
    divider: 'rgba(255,255,255,0.1)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 15,
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(30, 30, 40, 0.7)',
          backdropFilter: 'blur(16px)', // Glass blur
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)',
          border: '1px solid rgba(255,255,255,0.12)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(20, 20, 30, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(24, 30, 44, 0.5)',
          boxShadow: '0 2px 12px 0 rgba(142,202,230,0.15)',
          borderRadius: 18,
          border: '1px solid rgba(37, 42, 55, 1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          background: 'rgba(24, 30, 44, 0.5)',
          border: '1px solid rgba(142,202,230,0.14)',
          color: '#8ecae6',
          '&:hover': {
            background: 'rgba(142, 202, 230, 0.32)',
            boxShadow: '0 4px 16px rgba(142, 202, 230, 0.18)',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#8ecae6',
        },
        thumb: {
          '&:hover, &.Mui-focusVisible, &.Mui-active': {
            boxShadow: '0 0 0 8px rgba(142,202,230,0.16)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#8ecae6',
          '&:hover': {
            background: 'rgba(142,202,230,0.22)',
          },
        },
      },
    },
  },
});

export default darkTheme;
