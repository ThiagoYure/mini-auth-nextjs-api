"use client";

import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  Step,
  StepContent,
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
  StepButton,
  Snackbar,
  CircularProgress,
  useTheme,
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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Country } from "@/types/Country";
import { State } from "@/types/State";
import { City } from "@/types/City";
import { registerUser } from "@/services/authService";
import { saveUserData } from "@/services/userService";
import { FirebaseError } from "firebase/app";
import { formatPhoneNumber, formatPostalCode } from "@/utils/formatters";

const steps = ["Personal Info", "Location Info", "Contact Info", "Access Info"];
const stepsToRegister = steps.length;

export default function FormCadastro() {
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processingData, setProcessingData] = useState(false);
  const [message, setMessage] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: {
      common: "",
      official: "",
      nativeName: "",
    },
    translations: "",
    cca2: "",
    idd: { root: "", suffixes: [] },
    postalCode: {
      format: "",
      regex: "",
    },
  });
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const theme = useTheme();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const validateStepFields = async () => {
    let stepFields: (keyof FormData)[] = [];

    switch (activeStep) {
      case 0:
        stepFields = ["firstName", "lastName", "birthdate"];
        break;
      case 1:
        stepFields = ["country", "state", "city", "postalCode"];
        break;
      case 2:
        stepFields = ["phoneNumber", "email", "confirmEmail"];
        break;
      case 3:
        stepFields = ["password", "confirmPassword"];
        break;
      default:
        stepFields = [];
    }

    const result = await trigger(stepFields);
    return result;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === stepsToRegister - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === stepsToRegister;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    validateStepFields().then((res) => {
      if (res) {
        setCompleted({
          ...completed,
          [activeStep]: true,
        });
        if (!allStepsCompleted()) {
          handleNext();
        } else {
          setActiveStep(-1);
        }
      }
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const schema = z
    .object({
      firstName: z
        .string()
        .min(3, "Your first name must have at least 3 letters."),
      lastName: z
        .string()
        .min(3, "Your last name must have at least 3 letters."),
      birthdate: z.string(),
      country: z.string().nonempty("You must specify a country."),
      state: z.string().nonempty("You must specify a state."),
      city: z.string().nonempty("You must specify a city."),
      postalCode: z
        .string()
        .nonempty("You must specify a postal code.")
        .regex(
          new RegExp(selectedCountry.postalCode.regex),
          "Invalid postal code format."
        ),
      phoneNumber: z
        .string()
        .nonempty("You must inform a phone number.")
        .min(15, "The phone number must have at least 15 digits."),
      email: z
        .string()
        .nonempty("You must inform a valid email")
        .email("invalid email."),
      confirmEmail: z
        .string()
        .nonempty("Confirm your email please.")
        .email("invalid email."),
      password: z
        .string()
        .nonempty("You must inform a password.")
        .min(6, "The password must have at least 8 characters.")
        .regex(/[A-Z]/, "The password must have at least 1 capital letter.")
        .regex(/[0-9]/, "The password must have at least 1 number."),
      confirmPassword: z.string().nonempty("Confirm your password please."),
    })
    .refine((data) => !isNaN(Date.parse(data.birthdate)), {
      message: "Invalid date format",
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
    trigger,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      birthdate: "",
      city: "",
      confirmEmail: "",
      confirmPassword: "",
      country: "",
      email: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      postalCode: "",
      state: "",
    },
  });

  const fetchCountries = async () => {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,translations,idd,cca2,postalCode",
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data.sort((a: Country, b: Country) =>
      a.name.common.localeCompare(b.name.common)
    );
  };

  useEffect(() => {
    const data = fetchCountries();
    data.then((res) => {
      setCountries(res);
    });
    setLoading(false);
  }, []);

  const onSubmit = async (data: FormData) => {
    setProcessing(true);
    const preparedPhone = (calculateIdd() + data.phoneNumber).replace(
      /\D/g,
      ""
    );
    try {
      const user = await registerUser(data.email, data.password);

      if (!user?.uid) {
        setProcessing(false);
        setSuccess(false);
        setMessage("Registration failed.");
        setOpenSnackbar(true);
      } else {
        console.log(preparedPhone);
        const userData = {
          birthdate: data.birthdate,
          city: data.city,
          email: data.email,
          confirmEmail: data.confirmEmail,
          state: data.state,
          country: data.country,
          postalCode: data.postalCode,
          phoneNumber: preparedPhone,
          firstName: data.firstName,
          lastName: data.lastName,
          uid: user.uid,
        };

        try {
          await saveUserData(userData);
          setProcessing(false);
          setSuccess(true);
          setMessage("Registration successfull! You can proceed to login now.");
          setOpenSnackbar(true);
          reset();
          setSelectedCountry({
            name: {
              common: "",
              official: "",
              nativeName: "",
            },
            translations: "",
            cca2: "",
            idd: { root: "", suffixes: [] },
            postalCode: {
              format: "",
              regex: "",
            },
          });
          setStates([]);
          setCities([]);
          setActiveStep(0);
          setCompleted({});
        } catch (error: unknown) {
          setProcessing(false);
          if (error instanceof FirebaseError) {
            setSuccess(false);
            setMessage("An error occurred trying to save the user data.");
            setOpenSnackbar(true);
            console.error(
              "Registration failed. An error occurred:",
              error.code
            );
          } else {
            setSuccess(false);
            setMessage("An error occurred trying to save the user data.");
            setOpenSnackbar(true);
            console.error(
              "Registration failed. An unknown error occurred:",
              error
            );
          }
        }
      }
    } catch (error: unknown) {
      setProcessing(false);
      if (error instanceof FirebaseError) {
        setSuccess(false);
        if (error.code === "auth/email-already-in-use") {
          setMessage(
            "Registration failed. Already exists an registered user with this email."
          );
        } else {
          setMessage("Registration Failed.");
        }
        setOpenSnackbar(true);
        console.error("Registration failed. An error occurred:", error.code);
      } else {
        setSuccess(false);
        setMessage("Registration failed.");
        setOpenSnackbar(true);
        console.error("Registration failed. An unknown error occurred:", error);
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSelectedCountryChanged = async (countryCode: string) => {
    setProcessingData(true);
    const selectedCountry: Country[] = countries.filter((country) => {
      return country.cca2 === countryCode;
    });
    setSelectedCountry(selectedCountry[0]);

    const headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      process.env.NEXT_PUBLIC_STATES_API_KEY || ""
    );

    const res = await fetch(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      {
        method: "GET",
        headers: headers,
      }
    );

    const data = await res.json();
    setStates(data.sort((a: State, b: State) => a.name.localeCompare(b.name)));
    setProcessingData(false);
  };

  const handleSelectedStateChanged = async (
    countryCode: string,
    stateCode: string
  ) => {
    setProcessingData(true);
    const headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      process.env.NEXT_PUBLIC_STATES_API_KEY || ""
    );

    const res = await fetch(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
      {
        method: "GET",
        headers: headers,
      }
    );

    const data = await res.json();
    setCities(data.sort((a: City, b: City) => a.name.localeCompare(b.name)));
    setProcessingData(false);
  };

  function calculateIdd() {
    if (selectedCountry) {
      let idd = selectedCountry.idd.root;
      selectedCountry.idd.suffixes.map((suffix) => {
        idd = idd + suffix;
      });
      return idd;
    }
    return "+55";
  }

  if (loading) return <CircularProgress />;
  if (!countries) return <p>Can&apos;t retrieve data</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        height: "100%",
        marginTop: "2rem",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Stepper nonLinear activeStep={activeStep} orientation="vertical">
        <Step completed={completed[0]}>
          <StepButton
            sx={{
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-active": {
                color: theme.palette.primary.main,
              },
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-completed": {
                color: theme.palette.primary.main,
              },
            }}
            onClick={handleStep(0)}
          >
            Personal Info
          </StepButton>
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
                      color: theme.typography,
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment
                          sx={{ color: theme.typography }}
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
                      color: theme.typography,
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment
                          sx={{ color: theme.typography }}
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
                    color: theme.typography,
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
              <Button onClick={handleComplete}>
                {completedSteps() === stepsToRegister
                  ? "Finish"
                  : "Complete Step"}
              </Button>
            </Stack>
          </StepContent>
        </Step>
        <Step completed={completed[1]}>
          <StepButton
            sx={{
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-active": {
                color: theme.palette.primary.main,
              },
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-completed": {
                color: theme.palette.primary.main,
              },
            }}
            onClick={handleStep(1)}
          >
            Location Info
          </StepButton>
          <StepContent>
            <Stack direction={"column"} spacing={2} sx={{ mt: 2 }}>
              <Stack direction={"row"} spacing={2}>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={!!errors.country}
                      sx={{
                        "& .mui-akcn92-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root":
                          {
                            color: theme.typography,
                          },
                        svg: {
                          color: theme.typography,
                        },
                      }}
                    >
                      <InputLabel>Country</InputLabel>
                      <Select
                        {...field}
                        label="Country"
                        value={field.value}
                        onChange={(e) => {
                          const name = e.target.value;
                          const country = countries.find(
                            (c: Country) => c.name.common === name
                          );
                          if (country) {
                            setSelectedCountry(country);
                            field.onChange(country.name.common);
                            handleSelectedCountryChanged(country.cca2);
                          }
                        }}
                      >
                        {countries.map((country) => (
                          <MenuItem
                            key={country.cca2}
                            value={country.name.common}
                          >
                            {country.name.common}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.country?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={!!errors.state}
                      sx={{
                        "& .mui-akcn92-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root":
                          {
                            color: theme.typography,
                          },
                        svg: {
                          color: theme.typography,
                        },
                      }}
                    >
                      <InputLabel>State</InputLabel>
                      <Select
                        {...field}
                        label="State"
                        value={field.value}
                        onChange={(e) => {
                          const name = e.target.value;
                          const state = states.find(
                            (s: State) => s.name === name
                          );
                          if (state) {
                            field.onChange(name);
                            handleSelectedStateChanged(
                              selectedCountry.cca2,
                              state.iso2
                            );
                          }
                        }}
                      >
                        {states.length > 0 ? (
                          states.map((state) => (
                            <MenuItem key={state.id} value={state.name}>
                              {state.name}
                            </MenuItem>
                          ))
                        ) : processingData ? (
                          <MenuItem disabled>
                            <CircularProgress size="30px" sx={{ mr: "1rem" }} />{" "}
                            loading data...
                          </MenuItem>
                        ) : (
                          <MenuItem disabled>Select a country first.</MenuItem>
                        )}
                      </Select>
                      <FormHelperText>{errors.state?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={!!errors.city}
                      sx={{
                        "& .mui-akcn92-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root":
                          {
                            color: theme.typography,
                          },
                        svg: {
                          color: theme.typography,
                        },
                      }}
                    >
                      <InputLabel>City</InputLabel>
                      <Select
                        {...field}
                        label="City"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      >
                        {cities.length > 0 ? (
                          cities.map((city) => (
                            <MenuItem key={city.id} value={city.name}>
                              {city.name}
                            </MenuItem>
                          ))
                        ) : processingData ? (
                          <MenuItem disabled>
                            <CircularProgress size="30px" sx={{ mr: "1rem" }} />{" "}
                            loading data...
                          </MenuItem>
                        ) : (
                          <MenuItem disabled>Select a state first.</MenuItem>
                        )}
                      </Select>
                      <FormHelperText>{errors.city?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      type="text"
                      required
                      label="Postal Code"
                      fullWidth
                      error={!!errors.postalCode}
                      helperText={errors.postalCode?.message}
                      onChange={(e) => {
                        const { value } = e.target;
                        if (selectedCountry) {
                          e.target.value = formatPostalCode(
                            value,
                            selectedCountry.postalCode.format
                          );
                        }
                        e.target.value = formatPostalCode(value, "#####-###");

                        field.onChange(e);
                      }}
                      sx={{
                        input: { color: theme.typography },
                      }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment
                              sx={{ color: theme.typography }}
                              position="start"
                            >
                              <PinIcon />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
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
              <Button onClick={handleBack} variant="outlined" size="small">
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                Continue
              </Button>
              <Button onClick={handleComplete}>
                {completedSteps() === stepsToRegister
                  ? "Finish"
                  : "Complete Step"}
              </Button>
            </Stack>
          </StepContent>
        </Step>
        <Step completed={completed[2]}>
          <StepButton
            sx={{
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-active": {
                color: theme.palette.primary.main,
              },
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-completed": {
                color: theme.palette.primary.main,
              },
            }}
            onClick={handleStep(2)}
          >
            Contact Info
          </StepButton>
          <StepContent>
            <Stack direction={"column"} spacing={2} sx={{ mt: 2 }}>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    type="tel"
                    required
                    label="Phone Number"
                    fullWidth
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                    onChange={(e) => {
                      const { value } = e.target;
                      e.target.value = formatPhoneNumber(value);
                      field.onChange(e);
                    }}
                    sx={{
                      input: { color: theme.typography },
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment
                            sx={{ color: theme.typography }}
                            position="start"
                          >
                            <ContactPhoneIcon sx={{ mr: 1 }} />
                            {calculateIdd()}
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
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
                    color: theme.typography,
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        sx={{ color: theme.typography }}
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
                    color: theme.typography,
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        sx={{ color: theme.typography }}
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
              <Button onClick={handleBack} variant="outlined" size="small">
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                Continue
              </Button>
              <Button onClick={handleComplete}>
                {completedSteps() === stepsToRegister
                  ? "Finish"
                  : "Complete Step"}
              </Button>
            </Stack>
          </StepContent>
        </Step>
        <Step completed={completed[3]}>
          <StepButton
            sx={{
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-active": {
                color: theme.palette.primary.main,
              },
              "& .mui-1ew0d3t-MuiStepLabel-label.Mui-completed": {
                color: theme.palette.primary.main,
              },
            }}
            onClick={handleStep(3)}
          >
            Access Info
          </StepButton>
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
                    color: theme.typography,
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        sx={{ color: theme.typography }}
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
                            <VisibilityOffIcon
                              sx={{ color: theme.typography }}
                            />
                          ) : (
                            <VisibilityIcon sx={{ color: theme.typography }} />
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
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{
                  input: {
                    color: theme.typography,
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        sx={{ color: theme.typography }}
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
                            <VisibilityOffIcon
                              sx={{ color: theme.typography }}
                            />
                          ) : (
                            <VisibilityIcon sx={{ color: theme.typography }} />
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
              <Button onClick={handleBack} variant="outlined" size="small">
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                Continue
              </Button>
              <Button onClick={handleComplete}>
                {completedSteps() === stepsToRegister
                  ? "Finish"
                  : "Complete Step"}
              </Button>
            </Stack>
          </StepContent>
        </Step>
      </Stepper>
      {allStepsCompleted() && (
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
        loading={processing}
        loadingPosition="end"
        disableElevation
        disabled={!allStepsCompleted()}
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
