import { Box, createTheme, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
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
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
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
  );
};
