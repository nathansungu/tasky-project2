import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import axiosInstance from "../../api/axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CalendarMonth } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type task = {
  id: string;
  title: string;
  description: string;
  urgency: string;
  createdAt: string;
  deadLine: string;
  iscompleted: boolean;
};
const UrgentTaskCard = () => {
  const [tasks, setTasks] = useState([]);
  const [backendResponse, setBackendResponse] = useState("");
  const [CompleteStatus, setCompleteStatus] = useState("");
  const [errorState, setErrorState] = useState(false)

  const navigate = useNavigate();
  const fetchUrgentTask = async () => {
    const response = await axiosInstance.get("/task");
    const { data, message } = response.data!;
    setTasks(data);
    setBackendResponse(message);
    return data;
  };
  const { isLoading, error } = useQuery({
    queryKey: ["tasksData"],
    queryFn: fetchUrgentTask,
  });

  const { mutate: mutateCompleteTask } = useMutation({
    mutationKey: ["toggleComplete"],
    mutationFn: async function TogleComplete(data: {
      status: boolean;
      id: string;
    }) {
      const url = data.status ? "/task/complete" : "task/inComplete";
      const response = await axiosInstance.patch(`${url}/${data.id}`);
      setCompleteStatus(response.data!.message);
      return response.data;
    },
    onSuccess: () => {
      fetchUrgentTask();

      return;
    },
  });

  const { mutate: mutateDeleteTask } = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: async function deleteTask(id: string) {
      const response = await axiosInstance.delete(`/task/${id}`);
      setBackendResponse(response.data!.message);
    },
    onSuccess: () => {
      fetchUrgentTask();
      return;
    },
  });

  const markComplete = async (status: boolean, id: string) => {
    const data = { status, id };
    mutateCompleteTask(data);
    return;
  };

  const deleteTask = async (id: string) => {
    mutateDeleteTask(id);
  };

  //set timeout
     
  return (
    <>
      {/* //TODO : add time out on alerts */}
      {!!CompleteStatus && <Alert>{CompleteStatus}</Alert>}
      {!!backendResponse && <Alert>{backendResponse}</Alert>}
      {error && (
        <Stack
          sx={{ mt: "30%", justifyContent: "center", alignItems: "center" }}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
              textAlign: "center",
              color: "red",
              fontSize: "1.5rem",
            }}
          >
            {backendResponse}
          </Typography>
        </Stack>
      )}
      {isLoading && (
        <Stack sx={{ width: "100%", height: "50vh", justifyContent: "center" }}>
          <Typography
            sx={{
              textTransform: "capitalize",
              textAlign: "center",
              color: "green",
              fontSize: "1.5rem",
            }}
          >
            loading feeds, please wait ...
          </Typography>
        </Stack>
      )}
      <Grid container columns={12} spacing={2} mt={4} mx={1}>
        {tasks.map((task: task) => (
          <Grid key={task.id} size={{ md: 4, sm: 6, xs: 12 }}>
            <Card sx={{ minHeight: "22rem" }}>
              <CardContent
                sx={{ minHeight: "10rem", backgroundColor: "grey.100" }}
              >
                <Typography fontSize="1.5rem">{task.title}</Typography>
                <Typography>{task.description}</Typography>
              </CardContent>
              <CardContent>
                <Stack
                  direction={{ xs: "row", sm: "column", md: "row" }}
                  sx={{ alignItems: "center" }}
                >
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center", mr: 2, fontStyle: "italic" }}
                  >
                    <Typography>Pending</Typography>
                    <Switch
                      onChange={async (_event, checked) => {
                        await markComplete(checked, task.id);
                      }}
                      checked={task.iscompleted}
                    ></Switch>
                    <Typography>Done</Typography>
                  </Stack>

                  <Button onClick={() => deleteTask(task.id)}>Delete</Button>
                  <Button onClick={() => navigate(`/task-update/${task.id}`)}>
                    Update
                  </Button>
                </Stack>

                <Stack
                  direction="column"
                  sx={{ justifyContent: "center", gap: "10%", mt: 2 }}
                >
                  <Stack gap={1} alignItems="center" direction="row">
                    <CalendarMonth sx={{ backgroundColor: "grey.200" }} />
                    {task.createdAt.slice(0, 10)}
                  </Stack>

                  <Typography gap={1} mt={2} color="warning">
                    DeadLine:
                    {task.deadLine || "Not set"}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default UrgentTaskCard;
