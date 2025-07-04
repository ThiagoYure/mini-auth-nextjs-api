"use client";

import FormLogin from "@/components/forms/formLogin";
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";

export default function Login() {
  const theme = useTheme();

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "92vh",
      }}
    >
      <Stack
        direction={{
          xs: "column-reverse",
          sm: "column-reverse",
          md: "row",
          lg: "row",
        }}
        sx={{
          height: {
            xs: "80vh",
            sm: "80vh",
            md: "500px",
            lg: "500px",
          },
          minWidth: {
            xs: "80%",
            sm: "80%",
            md: "800px",
            lg: "800px",
          },
          borderRadius: "1rem",
          position: "relative",
          backgroundColor: theme.palette.background.paper,
          "&::before": {
            content: "''",
            zIndex: -1,
            borderRadius: "1rem",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            boxShadow: "#d859ff 0px 150px 200px -100px",
            mixBlendMode: "soft-light",
          },
        }}
      >
        <Stack
          spacing={4}
          alignItems={"center"}
          justifyContent={"center"}
          flex={1}
          sx={{ padding: "1rem 3rem", textAlign: "center" }}
        >
          <Typography variant="h3" fontWeight={"700"} color="primary">
            Hi User
          </Typography>
          <Typography variant="body2">
            Welcome to a mini auth app by Thiago Yure.
          </Typography>
          <FormLogin />
          <Stack direction={"row"} spacing={1} lineHeight={1.2}>
            <Typography variant="body2">
              Don&apos;t have an account yet?
            </Typography>
            <Link
              href="/cadastro"
              style={{
                color: theme.palette.primary.main,
                cursor: "pointer",
              }}
            >
              Sing up
            </Link>
          </Stack>
        </Stack>
        <Box
          sx={{
            borderRadius: {
              xs: "1rem 1rem 0 0",
              sm: "1rem 1rem 0 0",
              md: "0 1rem 1rem 0",
              lg: "0 1rem 1rem 0",
            },
            backgroundImage: "url('/images/image-login.webp')",
            flex: 1,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </Stack>
    </Container>
  );
}
