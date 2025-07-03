"use client";

import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { useThemeStore } from "@/stores/themeStore";
import { lightTheme } from "@/themes/lightTheme";
import { darkTheme } from "@/themes/darkTheme";
import { colorfullTheme } from "@/themes/colorfullTheme";
import CustomFooter from "@/components/shared/customFooter";
import PageTransition from "@/components/shared/pageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeKey = useThemeStore((s) => s.theme);

  const theme =
    themeKey === "dark"
      ? darkTheme
      : themeKey === "colorfull"
      ? colorfullTheme
      : lightTheme;

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                body: {
                  background: theme.palette.background.default,
                },
              }}
            />
            <PageTransition>{children}</PageTransition>
            <CustomFooter />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
