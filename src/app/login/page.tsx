"use client";

import FormLogin from "@/components/forms/formLogin";
import customTheme from "@/themes/customTheme";
import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Login() {
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
        direction={"row"}
        sx={{
          minHeight: 450,
          minWidth: 800,
          borderRadius: "1rem",
          position: "relative",
          backgroundColor: customTheme.palette.background.paper,
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
                color: customTheme.palette.primary.main,
                cursor: "pointer",
              }}
            >
              Sing up
            </Link>
          </Stack>
        </Stack>
        <Box
          sx={{
            borderRadius: "0 1rem 1rem 0",
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
