import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";

export default function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <FormControl
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        marginTop: "2rem",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Email"
        required
        fullWidth
        sx={{
          input: {
            color: "#c2c2c2",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment sx={{ color: "#c2c2c2" }} position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        variant="outlined"
        type={showPassword ? "text" : "password"}
        required
        label="Senha"
        fullWidth
        sx={{
          input: {
            color: "#c2c2c2",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment sx={{ color: "#c2c2c2" }} position="start">
              <LockIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? (
                  <VisibilityOffIcon sx={{ color: "#c2c2c2" }} />
                ) : (
                  <VisibilityIcon sx={{ color: "#c2c2c2" }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        disableElevation
        size="large"
        sx={{ borderRadius: "5rem" }}
      >
        Entrar
      </Button>
    </FormControl>
  );
}
