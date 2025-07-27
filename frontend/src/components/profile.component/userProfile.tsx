import { useEffect, useState } from "react";
import useUserStore from "../../store/logedinState.store";
import axiosInstance from "../../api/axios";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
type userDetails = {
  firstName: string;
  secondName: string;
  email: string;
  userName: string;
};
const HandleUserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmailAddress] = useState("");
  const [userName, setUserName] = useState("");

  const [error, setError] = useState( false );
  const [response, setResponse] = useState("");

  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setSecondName(user.secondName);
      setEmailAddress(user.email);
      setUserName(user.userName);
    }
  }, [user]);
  const { isPending, mutate } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (userDetails: userDetails) => {
      const response = await axiosInstance.patch(`/user/`, userDetails);
      const { message } = response.data;
      setResponse(message);
      return response.data;
    },
    onSuccess: () => {
      setEditMode(false);
      setError(false);
    },
    onError: (error:any) => {
      const reError = error.response!.data.message 
      setResponse(reError)
      setError( true);
    },
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false)
    setResponse("")

    const userDetails: userDetails = {
      firstName,
      secondName,
      email,
      userName,
    };

    mutate(userDetails);
  };

  const handelCancel = (e: React.FormEvent) => {
    e.preventDefault();

    setEditMode(false);
    return;
  };

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: 600, margin: "2rem auto", padding: 4 }}
    >
      {error && <Alert color="error">{response}</Alert>}
      {!error&& !!response && <Alert color="success">{response}</Alert>}
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, sm: 4 }} textAlign="center">
          <Avatar sx={{ width: 120, height: 120, margin: "0 auto",  textTransform:"capitalize"}}>
            <Typography fontSize="4rem">{firstName.charAt(0)}</Typography>
            <Typography fontSize="4rem">{secondName.charAt(0)}</Typography>
            
          </Avatar>
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }}>
          <Typography variant="h5" gutterBottom>
            {editMode ? "Edit Profile" : " Profile"}
          </Typography>

          <Box component="form">
            <TextField
              margin="dense"
              label="First Name"
              sx={{textTransform:"capitalize"}}
              fullWidth
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              disabled={!editMode}
            />
            <TextField
              margin="dense"
              name="lastName"
              label="Last Name"
              sx={{textTransform:"capitalize"}}
              fullWidth
              value={secondName}
              onChange={(e) => {
                setSecondName(e.target.value);
              }}
              disabled={!editMode}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              sx={{textTransform:"capitalize"}}
              fullWidth
              value={email}
              onChange={(e) => {
                setEmailAddress(e.target.value);
              }}
              disabled={!editMode}
            />
            <TextField
              margin="dense"
              name="username"
              label="Username"
              sx={{textTransform:"capitalize"}}
              fullWidth
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              disabled={!editMode}
            />
          </Box>

          <Box mt={2}>
            {editMode ? (
              <>
                <Button
                  loading={isPending}
                  onClick={handleUpdate}
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                >
                  Save
                </Button>
                <Button
                  onClick={handelCancel}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="outlined" onClick={() => {setEditMode(true)
                setError(false);
                 setResponse("")
              }}>
                Edit Profile
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HandleUserProfile;
