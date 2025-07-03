"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Fade, Box } from "@mui/material";
import { LoadingScreen } from "./loadingScreen";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setLoading(true);
    setShowContent(false);

    const timeout = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
    }, 800);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <Fade in={showContent} timeout={800}>
      <Box>{loading ? <LoadingScreen /> : children}</Box>
    </Fade>
  );
}
