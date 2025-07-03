"use client";
import { createTheme } from "@mui/material/styles";
import { Montserrat, Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "400",
});

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const lightTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          disableElevation: true,
          borderRadius: "5rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#212121",
            color: "#212121",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9c27b0",
            color: "#212121",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9c27b0",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: [oswald, montserrat].join(","),
    allVariants: {
      color: "#212121",
      fontFamily: "montserrat",
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#9c27b0",
      light: "#af52bf",
      dark: "#6d1b7b",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fdd835",
      light: "#fddf5d",
      dark: "#b19725",
      contrastText: "#000",
    },
    background: {
      default: "#e0e0e0",
      paper: "#f2f2f2",
    },
  },
});
