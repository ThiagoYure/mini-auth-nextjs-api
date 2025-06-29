import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Box,
  Stack,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PinIcon from "@mui/icons-material/Pin";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import customTheme from "@/themes/customTheme";

const stepsToRegister = 4;

export default function FormCadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel
            sx={{
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-active": {
                color: customTheme.palette.primary.main,
              },
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-completed": {
                color: customTheme.palette.primary.main,
              },
            }}
          >
            Personal Info
          </StepLabel>
          <StepContent>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                variant="outlined"
                type="text"
                required
                label="Full Name"
                fullWidth
                sx={{
                  input: {
                    color: "#c2c2c2",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        sx={{ color: "#c2c2c2" }}
                        position="start"
                      >
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                variant="outlined"
                type="date"
                required
                label="Birthdate"
                fullWidth
                sx={{
                  input: {
                    color: "#c2c2c2",
                  },
                }}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Stack>
            <Stack
              direction={"row"}
              spacing={2}
              sx={{
                display: "flex",
                mb: 2,
                mt: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="contained" onClick={handleNext}>
                Continue
              </Button>
            </Stack>
          </StepContent>
        </Step>
        <Step>
          <StepLabel
            sx={{
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-active": {
                color: customTheme.palette.primary.main,
              },
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-completed": {
                color: customTheme.palette.primary.main,
              },
            }}
          >
            Location Info
          </StepLabel>
          <StepContent>
            <Stack direction={"column"} spacing={2} sx={{ mt: 2 }}>
              <Stack direction={"row"} spacing={2}>
                <FormControl
                  required
                  fullWidth
                  sx={{
                    "& .mui-akcn92-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root":
                      {
                        color: "#c2c2c2",
                      },
                    svg: {
                      color: "#c2c2c2",
                    },
                  }}
                >
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Country"
                  >
                    <MenuItem value={"Brasil"}>Brasil</MenuItem>
                    <MenuItem value={"Noruega"}>Noruega</MenuItem>
                    <MenuItem value={"Espanha"}>Espanha</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  required
                  fullWidth
                  sx={{
                    "& .mui-akcn92-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root":
                      {
                        color: "#c2c2c2",
                      },
                    svg: {
                      color: "#c2c2c2",
                    },
                  }}
                >
                  <InputLabel id="demo-simple-select-label">State</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="State"
                  >
                    <MenuItem value={"Brasil"}>Brasil</MenuItem>
                    <MenuItem value={"Noruega"}>Noruega</MenuItem>
                    <MenuItem value={"Espanha"}>Espanha</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <FormControl
                  required
                  fullWidth
                  sx={{
                    "& .mui-akcn92-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root":
                      {
                        color: "#c2c2c2",
                      },
                    svg: {
                      color: "#c2c2c2",
                    },
                  }}
                >
                  <InputLabel id="demo-simple-select-label">City</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="City"
                  >
                    <MenuItem value={"Brasil"}>Brasil</MenuItem>
                    <MenuItem value={"Noruega"}>Noruega</MenuItem>
                    <MenuItem value={"Espanha"}>Espanha</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  variant="outlined"
                  type="text"
                  required
                  label="CEP"
                  fullWidth
                  sx={{
                    input: {
                      color: "#c2c2c2",
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment
                          sx={{ color: "#c2c2c2" }}
                          position="start"
                        >
                          <PinIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              spacing={2}
              sx={{
                display: "flex",
                mb: 2,
                mt: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="contained" onClick={handleNext}>
                Continue
              </Button>
              <Button onClick={handleBack} variant="outlined" size="small">
                Back
              </Button>
            </Stack>
          </StepContent>
        </Step>
        <Step>
          <StepLabel
            sx={{
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-active": {
                color: customTheme.palette.primary.main,
              },
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-completed": {
                color: customTheme.palette.primary.main,
              },
            }}
          >
            Contact Info
          </StepLabel>
          <StepContent>
            <Stack direction={"column"} spacing={2} sx={{ mt: 2 }}>
              <TextField
                variant="outlined"
                type="tel"
                required
                label="Phone Number"
                fullWidth
                sx={{
                  input: {
                    color: "#c2c2c2",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        sx={{ color: "#c2c2c2" }}
                        position="start"
                      >
                        <ContactPhoneIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                variant="outlined"
                type="email"
                required
                label="Email"
                fullWidth
                sx={{
                  input: {
                    color: "#c2c2c2",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        sx={{ color: "#c2c2c2" }}
                        position="start"
                      >
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                variant="outlined"
                type="email"
                required
                label="Confirm Email"
                fullWidth
                sx={{
                  input: {
                    color: "#c2c2c2",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        sx={{ color: "#c2c2c2" }}
                        position="start"
                      >
                        <MarkEmailReadIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>
            <Stack
              direction={"row"}
              spacing={2}
              sx={{
                display: "flex",
                mb: 2,
                mt: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="contained" onClick={handleNext}>
                Continue
              </Button>
              <Button onClick={handleBack} variant="outlined" size="small">
                Back
              </Button>
            </Stack>
          </StepContent>
        </Step>
        <Step>
          <StepLabel
            sx={{
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-active": {
                color: customTheme.palette.primary.main,
              },
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-completed": {
                color: customTheme.palette.primary.main,
              },
            }}
          >
            Access Info <Typography variant="caption">( Last step )</Typography>
          </StepLabel>
          <StepContent>
            <Stack direction={"column"} spacing={2} sx={{ mt: 2 }}>
              <TextField
                variant="outlined"
                type={showPassword ? "text" : "password"}
                required
                label="Password"
                fullWidth
                sx={{
                  input: {
                    color: "#c2c2c2",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        sx={{ color: "#c2c2c2" }}
                        position="start"
                      >
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon sx={{ color: "#c2c2c2" }} />
                          ) : (
                            <VisibilityIcon sx={{ color: "#c2c2c2" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                variant="outlined"
                type={showPassword ? "text" : "password"}
                required
                label="Confirm Password"
                fullWidth
                sx={{
                  input: {
                    color: "#c2c2c2",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        sx={{ color: "#c2c2c2" }}
                        position="start"
                      >
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon sx={{ color: "#c2c2c2" }} />
                          ) : (
                            <VisibilityIcon sx={{ color: "#c2c2c2" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>
            <Stack
              direction={"row"}
              spacing={2}
              sx={{
                display: "flex",
                mb: 2,
                mt: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="contained" onClick={handleNext}>
                Continue
              </Button>
              <Button onClick={handleBack} variant="outlined" size="small">
                Back
              </Button>
            </Stack>
          </StepContent>
        </Step>
      </Stepper>
      {activeStep === stepsToRegister && (
        <Box>
          <Typography>All steps completed. You can register now.</Typography>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleReset}
            sx={{ mt: 1, mr: 1 }}
          >
            Reset form
          </Button>
        </Box>
      )}
      <Button
        variant="contained"
        disableElevation
        disabled={!(activeStep === stepsToRegister)}
        size="large"
        sx={{
          "&:disabled": {
            color: "#c2c2c2",
            backgroundColor: "#4e4e4e",
          },
        }}
      >
        Register
      </Button>
    </FormControl>
  );
}
