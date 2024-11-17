import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "src/components/UI";
import LoadingPageSuspense from "src/pages/loading-page-suspense/loading-page-suspense";

export default function AppLayout() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <Header />
      <Box
        component="main"
        sx={{
          paddingRight: {
            xs: "1rem",
            sm: "2rem",
            m: "4rem",
          },
          paddingLeft: {
            xs: "1rem",
            sm: "2rem",
            m: "4rem",
          },
          paddingTop: "8rem",
          paddingBottom: "8rem",
          flex: "1",
          backgroundColor: "#edf0f2",
          overflow: "auto",
        }}
      >
        <LoadingPageSuspense loadingText={""}>
          <Outlet></Outlet>
        </LoadingPageSuspense>
      </Box>
    </Box>
  );
}
