"use client";

import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import customTheme from "@/themes/customTheme";
import CustomFooter from "@/components/shared/customFooter";
import PageTransition from "@/components/shared/pageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                body: {
                  background: customTheme.palette.background.default,
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
