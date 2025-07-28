import {
  Alert,
  Avatar,
  Badge,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import axiosInstance from "../../api/axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type group = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  undoneTasks: number;
};

const HandleGroups = () => {
  const navigate = useNavigate();

  const fetchGroups = async () => {
    const response = await axiosInstance.get("/group");
    return response.data.data;
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["fetchTask"],
    queryFn: fetchGroups,   
    
  },
  
)
console.log(data)

  return (
    <Grid container columns={12} mt={2} justifyContent={"center"} spacing={1}>
      {data&&!data.data &&(
        <Stack sx={{ width: "100%", mt:5, alignItems: "center" }}>
          <Typography sx={{color:"black", textTransform: "capitalize", textAlign: "center", fontSize: "1.5rem" }}>
           Your Goups Will Appear Here. <a href="create-group">Click Me</a>  to create group.
          </Typography>
        </Stack>
      )}
      {isLoading && (
        <Alert severity="info">Loading Groups, please wait...</Alert>
      )}
      {isError && <Alert severity="error">{(error as Error).message}</Alert>}
      {data?.message && <Alert severity="success">{data.message}</Alert>}
     

      {data?.map((grp: group) => (
        <Grid size={{ xs: 12, sm: 10, md: 8 }} key={grp.id}>
          <Card
            elevation={1}
            onClick={() => navigate(`/dashboard/group/${grp.id}`)}
          >
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center" gap={1}>
                  <Avatar sx={{ backgroundColor: "lightgreen" }}>
                    {grp.name.charAt(0)}
                    {grp.name.charAt(1)}
                  </Avatar>

                  <Stack>
                    <Typography sx={{ fontSize: "1.3rem" }}>
                      {grp.name}
                    </Typography>
                    <Typography sx={{ fontSize: ".9rem", fontStyle: "italic" }}>
                      {grp.description.slice(0, 20)}
                    </Typography>
                  </Stack>
                </Stack>

                <Badge
                  badgeContent={`${grp.undoneTasks}`}
                  color="success"
                  sx={{ mr: 2 }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default HandleGroups;
