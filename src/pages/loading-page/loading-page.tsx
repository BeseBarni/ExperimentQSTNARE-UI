import { Box, LinearProgress, Typography } from "@mui/material";

export interface LoadingPageProps {
  loadingText: string;
}

const LoadingPage = ({ loadingText }: LoadingPageProps) => {
  return (
    <div>
      <Typography>Betöltés...</Typography>
      <Typography>{loadingText}</Typography>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </div>
  );
};

export default LoadingPage;
