"use client"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme=createTheme()
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>

        {children}
        </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
