import { Box, createTheme, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createContext, Suspense, useEffect, useState } from "react";
import { purple } from "@mui/material/colors";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage, LoadingPage } from "src/pages";
import { queryClient } from "src/libs/react-query";

type AppProviderProps = {
  children: React.ReactNode;
};

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        underline: "hover",
        color: "black",
      },
    },
  },
  palette: {
    primary: {
      main: "#4ed981",
    },
    secondary: {
      main: purple[500],
    },
  },
});

type AppContextType = {
  windowWidth: number;
};

export const AppContext = createContext<AppContextType>({
  windowWidth: window.innerWidth,
});

export const AppProvider = ({ children }: AppProviderProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWindowWidth]);
  return (
    <AppContext.Provider value={{ windowWidth }}>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Suspense
          fallback={
            <Box sx={{ width: "100vh", height: "100vh", displa: "flex" }}>
              <LoadingPage loadingText="Alkalmazás indítása folyamatban, kérem várjon.."></LoadingPage>
            </Box>
          }
        >
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              {import.meta.env.DEV && <ReactQueryDevtools />}
              {children}
            </QueryClientProvider>
          </ThemeProvider>
        </Suspense>
      </ErrorBoundary>
    </AppContext.Provider>
  );
};
