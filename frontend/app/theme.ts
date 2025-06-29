
import { createTheme } from "@mui/material/styles";

const bgDark = "hsl(0 0% 0%)";
const bg = "hsl(0 0% 5%)";
const bgLight = "hsl(0 0% 10%)";

const bgBorder = "hsl(0 0% 20%)";

const text = "hsl(0 0% 95%)";
const textMuted = "hsl(0 0% 70%)";

const primary = "hsl(200 70% 70%)";
const secondary = "hsl(15 100% 80%)";

const primaryHover = "hsl(200 70% 70% / 0.2)";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: primary,
      contrastText: bgDark,
    },
    secondary: {
      main: secondary,
      contrastText: bgDark,
    },
    background: {
      default: bgDark,
      paper: bgLight,
    },
    text: {
      primary: text,
      secondary: textMuted,
      disabled: textMuted,
    },
    divider: text,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 15,
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: bgLight,
          backdropFilter: "blur(16px)",
          border: `1px solid ${bgBorder}`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: bg,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${bgBorder}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: bg,
          borderRadius: 18,
          border: `1px solid ${bgBorder}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          background: bg,
          border: `1px solid ${bgBorder}`,
          color: primary,
          opacity: 0.7,
          "&:hover": {
            opacity: 1,
            backgroundColor: primaryHover,
            transition: "opacity 0.3s ease",            
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: primary,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: primary,
          opacity: 0.7,
          "&:hover": {
            opacity: 1,
            backgroundColor: primaryHover,
            transition: "opacity 0.3s ease",            
          },
        },
      },
    },
  }
});

export default darkTheme;