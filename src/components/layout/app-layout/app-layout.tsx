import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "src/components/UI";

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
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}
