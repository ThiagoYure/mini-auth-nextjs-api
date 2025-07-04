"use client";

import FormCadastro from "@/components/forms/formCadastro";
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
        padding: "5rem",
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
          minWidth: {
            xs: "90vw",
            sm: "90vw",
            md: "80%",
            lg: "80%",
          },
          minHeight: {
            xs: "120vh",
            sm: "100vh",
            md: "90vh",
            lg: "90vh",
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
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            padding: "3rem 2rem",
            textAlign: "center",
            height: "100%",
          }}
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
                color: theme.palette.primary.main,
                cursor: "pointer",
              }}
            >
              Sing in
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
            flex: 1,
            backgroundImage: "url('/images/image-register.webp')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </Stack>
    </Container>
  );
}
