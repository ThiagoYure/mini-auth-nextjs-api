import { Typography } from "@mui/material";

export default function CustomFooter() {
  return (
    <footer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "1rem",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontSize: {
            xs: "0.8rem",
            sm: "0.8rem",
            md: "1rem",
            lg: "1rem",
          },
        }}
      >
        &copy;2025, Developed by Thiago Yure.
      </Typography>
    </footer>
  );
}
