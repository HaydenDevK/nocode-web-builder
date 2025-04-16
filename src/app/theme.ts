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
    primary: {
      main: "#6500c2",
      dark: "#440083",
      light: "#8b6efc",
      contrastText: "#ffffff",
    },
    mono: {
      main: grey[800],
      light: grey[200],
      dark: grey[900],
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
      fontSize: "20px",
      fontWeight: 600,
    },
    h5: {
      fontSize: "16px",
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
