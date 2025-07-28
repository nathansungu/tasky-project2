import {
  Alert,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axiosInstance from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
const CreateGroup = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //create group
  const createGroup = async (data: {
    imgUrl: string;
    name: string;
    description: string;
  }) => {
    const response = await axiosInstance.post("/group", data);
    console.log(response);
    return response.data.message;
  };

  const { mutate, data, isPending } = useMutation({
    mutationKey: ["createGroup"],
    mutationFn: createGroup,
    onError: (e) => {
      console.log(e.name);
    },
    onSuccess: () => {
      setDescription("");
      setImgUrl("");
      setName("");
    },
  });

  const HandleCreateGroup = () => {
    const data = {
      imgUrl,
      name,
      description,
    };
    mutate(data);
  };
  return (
    <>
      <Grid mt={3}>
        <Container>
          {data && <Alert >{data}</Alert>}
          <Stack
            direction="column"
            spacing={3}
            sx={{
              backgroundColor: "grey.100",
              height: "90vh",
              alignItems: "center",
            }}
          >
            <Typography sx={{mt:2}} textAlign="center" fontWeight="500" fontSize="2rem">
              Create Group
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <TextField
                type="file"
                sx={{ width: "45%" }}
                required
                value={imgUrl}
                helperText="Profile picture"
                onChange={(e) => setImgUrl(e.target.value)}
              />
              <TextField
                label="name"
                sx={{ width: "45%" }}
                value={name}
                required
                error={!name}
                helperText={!name ? "name is required" : ""}
                onChange={(e) => setName(e.target.value)}
              />
            </Stack>

            <TextField
              label="Description"
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
              loading={isPending}
              disabled={!name || !description}
              onClick={HandleCreateGroup}
            >
              Create
            </Button>
          </Stack>
        </Container>
      </Grid>
    </>
  );
};

export default CreateGroup;
