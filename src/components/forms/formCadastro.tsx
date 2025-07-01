"use client";

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
  FormHelperText,
  Alert,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PinIcon from "@mui/icons-material/Pin";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import customTheme from "@/themes/customTheme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const steps = ["Personal Info", "Location Info", "Contact Info", "Access Info"];
const stepsToRegister = steps.length;

export default function FormCadastro() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<
    {
      name: { common: string; official: string; nativeName: string };
      translations: string;
      cca2: string;
      idd: string;
      postalCode: {
        format: string;
        regex: string;
      };
    }[]
  >([
    {
      name: {
        common: "",
        official: "",
        nativeName: "",
      },
      translations: "",
      cca2: "",
      idd: "",
      postalCode: {
        format: "",
        regex: "",
      },
    },
  ]);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: { common: string; official: string; nativeName: string };
    translations: string;
    cca2: string;
    idd: string;
    postalCode: {
      format: string;
      regex: string;
    };
  }>({
    name: {
      common: "",
      official: "",
      nativeName: "",
    },
    translations: "",
    cca2: "",
    idd: "",
    postalCode: {
      format: "",
      regex: "",
    },
  });
  const [states, setStates] = useState<
    {
      id: string;
      name: string;
      iso2: string;
    }[]
  >([
    {
      id: "",
      name: "",
      iso2: "",
    },
  ]);
  const [cities, setCities] = useState<
    {
      id: string;
      name: string;
      latitude: string;
      longitude: string;
    }[]
  >([{ id: "", name: "", latitude: "", longitude: "" }]);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,translations,idd,cca2,postalcode",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data: []) => {
        data.sort(function (
          a: {
            name: { common: string; official: string; nativeName: string };
            translations: string;
            cca2: string;
            idd: string;
            postalCode: {
              format: string;
              regex: string;
            };
          },
          b: {
            name: { common: string; official: string; nativeName: string };
            translations: string;
            cca2: string;
            idd: string;
            postalCode: {
              format: string;
              regex: string;
            };
          }
        ) {
          const nomeA = a.name.common.toUpperCase();
          const nomeB = b.name.common.toUpperCase();
          if (nomeA < nomeB) {
            return -1;
          }
          if (nomeA > nomeB) {
            return 1;
          }
          return 0;
        });
        setCountries(data);
      });

    setLoading(false);
  }, []);

  const schema = z
    .object({
      firstName: z
        .string()
        .min(3, "Your first name must have at least 3 letters."),
      lastName: z
        .string()
        .min(3, "Your last name must have at least 3 letters."),
      birthdate: z.date(),
      country: z.string(),
      state: z.string(),
      city: z.string(),
      postalCode: z.string(),
      phoneNumber: z.string(),
      email: z.string().email("invalid email."),
      confirmEmail: z.string().email("invalid email."),
      password: z
        .string()
        .min(6, "The password must have at least 8 characters.")
        .regex(/[A-Z]/, "The password must have at least 1 capital letter.")
        .regex(/[0-9]/, "The password must have at least 1 number."),
      confirmPassword: z.string(),
    })
    .superRefine((data, ctx) => {
      const pattern = new RegExp(selectedCountry.postalCode.regex);
      if (pattern && !pattern.test(data.postalCode)) {
        ctx.addIssue({
          path: ["postalCode"],
          code: z.ZodIssueCode.custom,
          message: `Invalid Postal Code for selected country.`,
        });
      }
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "The passwords don't match.",
      path: ["confirmPassword"],
    })
    .refine((data) => data.email === data.confirmEmail, {
      message: "The emails don't match.",
      path: ["confirmEmail"],
    });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      setSuccess(true);
    } catch (err) {
      console.error("Error at registration:", err);
    }
  };

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

  const handleSelectedCountryChanged = async (event: SelectChangeEvent) => {
    const country = JSON.parse(event.target.value);
    setSelectedCountry(country);
    const headers = new Headers();
    headers.append("X-CSCAPI-KEY", process.env.STATES_API_KEY || "");

    fetch(
      `https://api.countrystatecity.in/v1/countries/${country.cca2}/states`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((data: []) => {
        data.sort(function (
          a: {
            id: string;
            name: string;
            iso2: string;
          },
          b: {
            id: string;
            name: string;
            iso2: string;
          }
        ) {
          const nomeA = a.name.toUpperCase();
          const nomeB = b.name.toUpperCase();
          if (nomeA < nomeB) {
            return -1;
          }
          if (nomeA > nomeB) {
            return 1;
          }
          return 0;
        });
        setStates(data);
      });
  };

  const handleSelectedStateChanged = async (event: SelectChangeEvent) => {
    const state = JSON.parse(event.target.value);
    const headers = new Headers();
    headers.append("X-CSCAPI-KEY", process.env.STATES_API_KEY || "");

    fetch(
      `https://api.countrystatecity.in/v1/countries/${selectedCountry.cca2}/states/${state.iso2}/cities`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        data.sort(function (
          a: {
            id: string;
            name: string;
            latitude: string;
            longitude: string;
          },
          b: {
            id: string;
            name: string;
            latitude: string;
            longitude: string;
          }
        ) {
          const nomeA = a.name.toUpperCase();
          const nomeB = b.name.toUpperCase();
          if (nomeA < nomeB) {
            return -1;
          }
          if (nomeA > nomeB) {
            return 1;
          }
          return 0;
        });
        setCities(data);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (!countries || !states || !cities) return <p>Can&apos;t retrieve data</p>;

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
              <Stack direction={"row"} spacing={2}>
                <TextField
                  variant="outlined"
                  type="text"
                  required
                  label="First Name"
                  fullWidth
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
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
                  type="text"
                  required
                  label="Last Name"
                  fullWidth
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
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
              </Stack>
              <TextField
                variant="outlined"
                type="date"
                required
                label="Birthdate"
                fullWidth
                {...register("birthdate")}
                error={!!errors.birthdate}
                helperText={errors.birthdate?.message}
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
                    {...register("country")}
                    error={!!errors.country}
                    onChange={(event: SelectChangeEvent) => {
                      handleSelectedCountryChanged(event);
                    }}
                  >
                    {countries.length > 0 &&
                      countries.map((country) => {
                        return (
                          <MenuItem
                            key={country.name.common}
                            value={JSON.stringify(country)}
                          >
                            {country.name.common}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText>{errors.country?.message}</FormHelperText>
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
                    {...register("state")}
                    error={!!errors.state}
                    onChange={(event: SelectChangeEvent) => {
                      handleSelectedStateChanged(event);
                    }}
                  >
                    {states.length > 0 &&
                      states.map((state) => {
                        return (
                          <MenuItem
                            key={state.name}
                            value={JSON.stringify(state)}
                          >
                            {state.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText>{errors.state?.message}</FormHelperText>
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
                    {...register("city")}
                    error={!!errors.city}
                  >
                    {cities.length > 0 &&
                      cities.map((city) => {
                        return (
                          <MenuItem key={city.name} value={city.name}>
                            {city.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText>{errors.city?.message}</FormHelperText>
                </FormControl>
                <TextField
                  variant="outlined"
                  type="text"
                  required
                  label="Postal Code"
                  fullWidth
                  {...register("postalCode")}
                  error={!!errors.postalCode}
                  helperText={errors.postalCode?.message}
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
                {...register("phoneNumber")}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
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
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
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
                {...register("confirmEmail")}
                error={!!errors.confirmEmail}
                helperText={errors.confirmEmail?.message}
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
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
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
                {...register("confirmEmail")}
                error={!!errors.confirmEmail}
                helperText={errors.confirmEmail?.message}
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
      {success && <Alert severity="success">Successfull registration!</Alert>}
    </form>
  );
}
