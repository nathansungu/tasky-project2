import {
  Alert,
  Avatar,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import axiosInstance from "../../api/axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type group = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const HandleGroups = () => {
  const [groups, setGroups] = useState([]);
  const [bckResponse, setBckResponse] = useState("");
  const fetchGroups = async () => {
    const response = await axiosInstance.get("/group");
    const { data, message } = response.data;
    setGroups(data);
    setBckResponse(message);
    return response.data;
  };

  const { isLoading } = useQuery({
    queryKey: ["fetchTask"],
    queryFn: fetchGroups,
  });

  return (
    <>
      <Grid container columns={12} mt={2} justifyContent={"center"} spacing={1}>
        {isLoading && <Alert> Loading Groups please wait</Alert>}
        {bckResponse && <Alert>{bckResponse}</Alert>}

        {groups.map((grp: group) => (
          <>
            <Grid size={{ xs: 12, md: 8, sm: 10 }}  ml={2}>
              <Card elevation={1}>
                <CardContent sx={{alignItems:"center"}}>
                  <Stack direction="row" sx={{ gap: "1%" }}>
                    <Avatar sx={{ backgroundColor: "lightgreen" }}>
                      {grp.name.charAt(0)}
                      {grp.name.charAt(1)}
                    </Avatar>

                    <Stack>
                      <Typography sx={{ fontSize: "1.3rem" }}>
                        {grp.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: ".9rem", fontStyle: "italic" }}
                      >
                        {grp.description.slice(0, 20)}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

export default HandleGroups;
