"use client";
import ThemeSelector from "@/components/shared/themeSelector";
import { useAuthStore } from "@/stores/authStore";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  useEffect(() => {
    if (user.uid === "") {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <Container
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Stack
        direction={"column"}
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
        textAlign={"center"}
        sx={{
          minHeight: "90vh",
          width: {
            xs: "90%",
            sm: "90%",
            md: "100%",
            lg: "100%",
          },
          p: 2,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          color="primary"
          sx={{
            fontSize: {
              xs: "1.2rem",
              sm: "1.5rem",
              md: "2rem",
              lg: "2rem",
            },
          }}
        >
          Bem-vindo, {user.email}
        </Typography>
        <ThemeSelector />
        <Button
          sx={{
            width: {
              xs: 1,
              sm: "300px",
              md: "300px",
              lg: "300px",
            },
          }}
          variant="outlined"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          Sair
        </Button>
      </Stack>
    </Container>
  );
}
