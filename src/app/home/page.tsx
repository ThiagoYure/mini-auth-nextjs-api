"use client";
import { useAuthStore } from "@/stores/authStore";
import { Button, Typography } from "@mui/material";
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
    <>
      <Typography variant="h4">Bem-vindo, {user.email}</Typography>
      <Button
        variant="outlined"
        onClick={() => {
          logout();
          router.push("/login");
        }}
      >
        Sair
      </Button>
    </>
  );
}
