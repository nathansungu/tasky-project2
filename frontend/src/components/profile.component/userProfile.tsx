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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axios from "../../api/axios";
type userDetails = {
  firstName: string;
  secondName: string;
  email: string;
  userName: string;
  imgUrl: string;
};
type passwordData = {
  currentPassword: string;
  newPassword: string;
};
const HandleUserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmailAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const [currentPassword, setCurrentPAssword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const [isLoding, setIsloading] = useState(false);

  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");

  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setSecondName(user.secondName);
      setEmailAddress(user.email);
      setUserName(user.userName);
      setImgUrl(user.imgUrl);
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
    onError: (error: any) => {
      const reError = error.response!.data.message;
      setResponse(reError);
      setError(true);
    },
  });
  const { mutate: passwordMutation, isPending: passIspending } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async (passwordData: passwordData) => {
      const response = await axiosInstance.patch(
        `/user/password`,
        passwordData
      );
      const { message } = response.data;
      setResponse(message);

      return response;
    },
    onError: (e: Error) => {
      if (e instanceof AxiosError) {
        setResponse(e.response?.data.message);
        setError(true);
        return;
      }
    },
    onSuccess: () => {
      setCurrentPAssword("");
      setNewPassword("");
    },
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setResponse("");
    const userProfile = await uploadImage();
    userProfile && setImgUrl(userProfile);
    const userDetails: userDetails = {
      firstName,
      secondName,
      email,
      userName,
      imgUrl: userProfile,
    };
    console.log(userDetails);
    mutate(userDetails);
  };

  const handleChanePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setResponse("");

    const data: passwordData = {
      currentPassword,
      newPassword,
    };

    passwordMutation(data);
  };

  const handelCancel = (e: React.FormEvent) => {
    e.preventDefault();

    setEditMode(false);
    setEditPassword(false);
    return;
  };

  const uploadImage = async () => {
    if (!img) {
      return null;
    }
    console.log(img);
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "codeyblogs");

    try {
      setIsloading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgmbv5dfg/image/upload",

        formData,
        {
          withCredentials: false,
        }
      );
      const url = response.data.secure_url;

      setIsloading(false);
      return url;
    } catch (error) {
      setIsloading(false);
      return null;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: 600, margin: "2rem auto", padding: 4 }}
    >
      {error && <Alert color="error">{response}</Alert>}
      {!error && !!response && <Alert color="success">{response}</Alert>}
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, sm: 4 }} textAlign="center">
          {imgUrl && (
            <Box
              component="img"
              src={imgUrl}
              width={120}
              height={120}
              margin="0 auto"
              borderRadius="50%"
            />
          )}
          {!imgUrl && (
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: "0 auto",
                textTransform: "capitalize",
              }}
            >
              <Typography fontSize="4rem">{firstName.charAt(0)}</Typography>
              <Typography fontSize="4rem">{secondName.charAt(0)}</Typography>
            </Avatar>
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }}>
          <Typography variant="h5" gutterBottom>
            {!editPassword
              ? editMode
                ? "Edit Profile"
                : " Profile"
              : "Change Password"}
          </Typography>

          {!editPassword && (
            <Box component="form">
              {editMode&&<Stack
                direction="row"
                mt={2}
                justifyContent="space-between"
                border="1px solid blue"
                p={1}

              >
                <Typography>Profile</Typography>
                <input
                  name="Image"
                  type="file"
                  required
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setImg(file);
                  }}
                />
              </Stack>}
              <TextField
                margin="dense"
                label="First Name"
                sx={{ textTransform: "capitalize" }}
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
                sx={{ textTransform: "capitalize" }}
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
                sx={{ textTransform: "capitalize" }}
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
                sx={{ textTransform: "capitalize" }}
                fullWidth
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                disabled={!editMode}
              />
            </Box>
          )}
          {editPassword && (
            <Box>
              <TextField
                margin="dense"
                label="Current PassWord"
                sx={{ textTransform: "capitalize" }}
                fullWidth
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPAssword(e.target.value);
                }}
              />
              <TextField
                margin="dense"
                label="NewPassword"
                sx={{ textTransform: "capitalize" }}
                fullWidth
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </Box>
          )}

          <Box mt={2}>
            {editMode || editPassword ? (
              <>
                <Button
                  loading={isPending || passIspending}
                  disabled={isLoding}
                  onClick={editMode ? handleUpdate : handleChanePassword}
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
              <Stack direction="row" justifyContent="space-between">
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEditMode(true);
                    setEditPassword(false);
                    setError(false);
                    setResponse("");
                  }}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEditPassword(true);
                    setEditMode(false);
                    setError(false);
                    setResponse("");
                  }}
                >
                  Change Password
                </Button>
              </Stack>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HandleUserProfile;
