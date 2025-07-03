import customTheme from "@/themes/customTheme";
import { Box, CircularProgress } from "@mui/material";

export function LoadingScreen() {
  return (
    <Box
      height="92vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={customTheme.palette.background.default}
    >
      <CircularProgress size={"100px"} />
    </Box>
  );
}
