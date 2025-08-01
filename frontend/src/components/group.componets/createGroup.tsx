import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axiosInstance from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateGroup = () => {
  const [img, setImg] = useState<File | null>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setIsloading] = useState(false);
  const navigate = useNavigate()
  //create group
  const createGroup = async (data: {
    imgUrl: string;
    name: string;
    description: string;
  }) => {
    const response = await axiosInstance.post("/group", data);
    return response.data;
  };

  const { mutate, data, isPending } = useMutation({
    mutationKey: ["createGroup"],
    mutationFn: createGroup,
    onSuccess: async(responseData) => {
      if(responseData){
      await navigate(`/dashboard/group/${responseData?.data}`)}
      setDescription(""); 
      setName("");
    },
    onError: (e)=>console.log(e)
  });

  const handleCreateGroup = async () => {
    const cloudinaryUrl = await uploadImage() || "";
    const data = {
      imgUrl: cloudinaryUrl,
      name,
      description,
    };
    mutate(data);
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
    <Grid>
      <Card
        sx={{
          mt: 3,
          maxWidth: "sm",
          mx: "auto",
          elevation: 4,
          p: 4,
          borderRadius: 4,
        }}
      >
        <CardContent>
          {data && <Alert>{data.message}</Alert>}
          <Stack
            direction="column"
            spacing={3}
            sx={{
              backgroundColor: "grey.100",
              height: "90vh",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Create New Group
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography>Profile Picture</Typography>
              <input
                name="Image"
                type="file"
                required
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImg(file);
                }}
              />
            </Stack>
            <TextField
              label="Name"
              sx={{ width: "45%" }}
              variant="outlined"
              value={name}
              required
              error={!name}
              helperText={!name ? "name is required" : ""}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={5}
              required
              sx={{ width: "80%" }}
              value={description}
              helperText={!description ? "Description is required" : ""}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              variant="outlined"
              color="success"
              size="medium"
              loading={isPending || loading}
              disabled={!name || !description}
              onClick={handleCreateGroup}
            >
              Create
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CreateGroup;
