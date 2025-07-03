"use client";
import ThemeSelector from "@/components/shared/themeSelector";
import { useAuthStore } from "@/stores/authStore";
import { Button, Stack, Typography } from "@mui/material";
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
    <Stack
      direction={"column"}
      spacing={2}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ width: "100%", height: "90vh" }}
    >
      <Typography variant="h4" fontWeight={700} color="primary">
        Bem-vindo, {user.email}
      </Typography>
      <ThemeSelector />
      <Button
        sx={{ width: "300px" }}
        variant="outlined"
        onClick={() => {
          logout();
          router.push("/login");
        }}
      >
        Sair
      </Button>
    </Stack>
  );
}
