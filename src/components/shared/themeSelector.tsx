"use client";

import { useThemeStore } from "@/stores/themeStore";
import { colorfullTheme } from "@/themes/colorfullTheme";
import { darkTheme } from "@/themes/darkTheme";
import { lightTheme } from "@/themes/lightTheme";
import { Button, Typography, Stack, Box } from "@mui/material";

export default function ThemeSelector() {
  const setTheme = useThemeStore((s) => s.setTheme);

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
      spacing={2}
      width={{
        xs: "100%",
        sm: "100%",
        md: "100%",
        lg: "100%",
      }}
    >
      <Typography variant="subtitle1" fontWeight={500}>
        Escolha o tema:
      </Typography>
      <Stack
        direction={{
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
        }}
        spacing={2}
        sx={{ p: 2 }}
      >
        <Box
          width={200}
          height={200}
          borderRadius={5}
          border={"2px solid #9c27b0"}
          p={2}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          sx={{ bgcolor: darkTheme.palette.background.default }}
        >
          <Box
            p={2}
            borderRadius={5}
            sx={{ bgcolor: darkTheme.palette.background.paper }}
          >
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{ color: darkTheme.typography.body1.color }}
            >
              Dark Theme
            </Typography>
          </Box>
          <Button
            fullWidth
            variant={"contained"}
            sx={{ bgcolor: darkTheme.palette.primary.main }}
            onClick={() => setTheme("dark")}
          >
            I want this
          </Button>
        </Box>
        <Box
          width={200}
          height={200}
          borderRadius={5}
          border={"2px solid #9c27b0"}
          p={2}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          sx={{ bgcolor: lightTheme.palette.background.default }}
        >
          <Box
            p={2}
            borderRadius={5}
            sx={{ bgcolor: lightTheme.palette.background.paper }}
          >
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{ color: lightTheme.typography.body1.color }}
            >
              Light Theme
            </Typography>
          </Box>
          <Button
            fullWidth
            variant={"contained"}
            sx={{ bgcolor: lightTheme.palette.primary.main }}
            onClick={() => setTheme("light")}
          >
            I want this
          </Button>
        </Box>
        <Box
          width={200}
          height={200}
          borderRadius={5}
          border={"2px solid #9c27b0"}
          p={2}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          sx={{ bgcolor: colorfullTheme.palette.background.default }}
        >
          <Box
            p={2}
            borderRadius={5}
            sx={{ bgcolor: colorfullTheme.palette.background.paper }}
          >
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{ color: colorfullTheme.typography.body1.color }}
            >
              Colorfull Theme
            </Typography>
          </Box>
          <Button
            fullWidth
            variant={"contained"}
            sx={{ bgcolor: colorfullTheme.palette.primary.main }}
            onClick={() => setTheme("colorfull")}
          >
            I want this
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}
