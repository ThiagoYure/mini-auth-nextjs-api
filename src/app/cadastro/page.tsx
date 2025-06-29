"use client";

import FormCadastro from "@/components/forms/formCadastro";
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
        padding: "5rem",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          minHeight: 450,
          width: 1000,
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
            boxShadow: "rgba(255, 255, 255, 1) 0px 150px 200px -100px",
            mixBlendMode: "soft-light",
          },
        }}
      >
        <Stack
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
          flex={1}
          sx={{ padding: "3rem 3rem", textAlign: "center" }}
        >
          <Typography variant="h3" fontWeight={"700"} color="primary">
            Registration
          </Typography>
          <Typography variant="body2">
            Complete your registration to use the app.
          </Typography>
          <FormCadastro />
          <Stack direction={"row"} spacing={1} lineHeight={1.2}>
            <Typography variant="body2">Already have an account?</Typography>
            <Link
              href="/login"
              style={{
                color: customTheme.palette.primary.main,
                cursor: "pointer",
              }}
            >
              Sing in
            </Link>
          </Stack>
        </Stack>
        <Box
          sx={{
            borderRadius: "0 1rem 1rem 0",
            backgroundImage: "url('/images/image-register.webp')",
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
