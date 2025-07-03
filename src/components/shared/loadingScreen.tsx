import { Box, CircularProgress, useTheme } from "@mui/material";

export function LoadingScreen() {
  const theme = useTheme();
  return (
    <Box
      height="92vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={theme.palette.background.default}
    >
      <CircularProgress size={"100px"} />
    </Box>
  );
}
