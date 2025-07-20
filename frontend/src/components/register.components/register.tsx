import { TextField, Button, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axios";

type UserData = {
  firstName: string;
  secondName: string;
  userName: string;
  password: string;
  email: string;
};

const HandleRegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [backedError, setBackendError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");  

  const { isPending,isError, mutate } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: async (userData: UserData) => {
      const response = await axiosInstance.post("/auth/register", userData);

      return response.data;
    },
    onError: (error: any) => {
      let reError  = error.response?.data?.message || "An error occurred";
      setBackendError(reError);
    },
    onSuccess: () => {
      setBackendError("");
      setConfirmPasswordError("");

      setFirstName("");
      setSecondName("");
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      
      
      alert("Registration successful!");

      //redirect to login
      window.location.href = "/login";
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //clear previous error messages
    setBackendError("");
    setConfirmPasswordError("");  

   


    const userData: UserData = {
      firstName,
      secondName,
      userName,
      password,
      email,
    };
    mutate(userData);
  };

  return (
    <Grid sx={{ mt: 1 }}>
      <Stack sx={{ alignItems: "center" }}>
        
          <Stack sx={{  width: { xs: "90%", sm: "70%", md: "50%" } }}>
            <form onSubmit={handleSubmit} style={{ width: "100%", alignItems: "center" }}>
              {isError && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {
                    backedError
                  }
                </Typography> 
              )}
                <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                required
                sx={{ mt: 1 }}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                />
                <TextField
                label="Second Name"
                variant="outlined"
                fullWidth
                required
                sx={{ mt: 1 }}
                value={secondName}
                onChange={(e) => {
                  setSecondName(e.target.value);
                }}
                />
                <TextField
                label="User Name"
                variant="outlined"
                fullWidth
                required
                sx={{ mt: 1 }}
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                />
                <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                sx={{ mt: 1 }}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                />
                <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                sx={{ mt: 1 }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                />
                <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                sx={{ mt: 1}}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                error={ password !== confirmPassword}
                helperText={
                  confirmPasswordError
                  ? confirmPasswordError
                  : password !== confirmPassword
                  ? "Passwords do not match."
                  : ""
                }
                />
              <Stack sx={{ mt: 1 }}>
              <Button type="submit" variant="contained" disabled={isPending}>
                <Typography>Register</Typography>
              </Button>
              </Stack>
              <Typography>
                Already have an account?
                <Button
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                  sx={{ color: "primary.main", fontSize: "1rem", ml: 1 }}
                >
                  click to login
                </Button>
                </Typography>
            </form>
          </Stack>
      
      </Stack>
    </Grid>
  );
};

export default HandleRegistrationForm;
