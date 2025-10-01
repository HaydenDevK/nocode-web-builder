"use client";

import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

// 타입 확장
declare module "@mui/material/styles" {
  interface Palette {
    mono: Palette["primary"];
  }
  interface PaletteOptions {
    mono?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsColorOverrides {
    mono: true;
  }
}

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      dark: "#000000",
      light: "#333333",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
      dark: "#f5f5f5",
      light: "#ffffff",
      contrastText: "#000000",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
    mono: {
      main: "#000000",
      light: "#666666",
      dark: "#000000",
      contrastText: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "'Spoqa Han Sans Neo', sans-serif",
    h1: {
      fontSize: "40px",
      fontWeight: 700,
    },
    h2: {
      fontSize: "32px",
      fontWeight: 700,
    },
    h3: {
      fontSize: "26px",
      fontWeight: 600,
    },
    h4: {
      fontSize: "22px",
      fontWeight: 600,
    },
    h5: {
      fontSize: "18px",
      fontWeight: 500,
    },
    h6: {
      fontSize: "14px",
      fontWeight: 500,
    },
    body1: {
      fontSize: "13px",
      fontWeight: 400,
    },
    body2: {
      fontSize: "12px",
      fontWeight: 300,
    },
  },
});

export default theme;
