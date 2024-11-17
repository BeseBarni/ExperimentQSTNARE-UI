import { Box, LinearProgress, Typography } from "@mui/material";
import { Suspense } from "react";
import { ChildrenProp } from "src/models";

export interface LoadingPageProps {
  loadingText: string;
}

const LoadingPageSuspense = ({
  loadingText,
  children,
}: LoadingPageProps & ChildrenProp) => {
  const fallback = (
    <>
      <Typography>Betöltés...</Typography>
      <Typography>{loadingText}</Typography>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </>
  );
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default LoadingPageSuspense;
