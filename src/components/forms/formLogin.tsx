import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/authStore";
import { loginUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function FormLogin() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const login = useAuthStore((s) => s.login);
  const router = useRouter();
  const theme = useTheme();

  const schema = z.object({
    email: z
      .string()
      .nonempty("You must inform a valid email")
      .email("invalid email."),
    password: z.string().nonempty("You must inform a password."),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data: FormData) => {
    setProcessing(true);
    try {
      const { user, token } = await loginUser(data.email, data.password);
      if (user) {
        login(user, token);
        setProcessing(false);
        setSuccess(true);
        setMessage("Registration successfull!");
        setOpenSnackbar(true);
        setTimeout(() => {
          router.push("/home");
        }, 500);
      }
    } catch (error: unknown) {
      setProcessing(false);
      if (error instanceof FirebaseError) {
        console.log(error.code);
        setSuccess(false);
        switch (error.code) {
          case "auth/invalid-credential":
            setMessage(
              "There's no user registered with this email or password."
            );
            break;
          default:
            setMessage("Login failed. An error occurred");
        }
        setOpenSnackbar(true);
      } else {
        setSuccess(false);
        setMessage("Login failed. An unknown error occurred");
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
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
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{
          input: {
            color: theme.typography,
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment sx={{ color: theme.typography }} position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        variant="outlined"
        type={showPassword ? "text" : "password"}
        required
        label="Password"
        fullWidth
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{
          input: {
            color: theme.typography,
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment sx={{ color: theme.typography }} position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? (
                    <VisibilityOffIcon sx={{ color: theme.typography }} />
                  ) : (
                    <VisibilityIcon sx={{ color: theme.typography }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        variant="contained"
        loading={processing}
        loadingPosition="end"
        disableElevation
        size="large"
        type="submit"
      >
        Register
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </form>
  );
}
