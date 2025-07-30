import {
  Alert,
  Card,
  CardContent,
  Grid,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import axiosInstance from "../../api/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IconButton } from "@mui/joy";
import type { task } from "../../DataTypes/taskTypes";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
const HandleCompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [backendResponse, setBackendResponse] = useState("");
  const [CompleteStatus, setCompleteStatus] = useState("");

  const fetchUrgentTask = async () => {
    const response = await axiosInstance.get("/task/complete");
    const { data, message } = response.data!;
    setTasks(data);
    setBackendResponse(message);
    return data;
  };
  const { isLoading } = useQuery({
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

  return (
    <>
      {!!CompleteStatus && <Alert>{CompleteStatus}</Alert>}
      {!!backendResponse && <Alert>{backendResponse}</Alert>}

      {tasks.length == 0 && !isLoading && (
        <Stack sx={{ width: "100%", mt: 5, alignItems: "center" }}>
          <Typography
            sx={{
              color: "black",
              textTransform: "capitalize",
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            Add Task to see them. Your Tasks will Appear Here
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

      <Grid container columns={12} spacing={2} mt={4} m={1}>
        {tasks.map((task: task) => (
          <Grid key={task.id} size={{ md: 4, sm: 6, xs: 12 }}>
            <Card>
              <CardContent
                sx={{ minHeight: "15rem", backgroundColor: "grey.100" }}
              >
                <Typography textTransform="capitalize" fontSize="1.5rem">
                  {task.title}
                </Typography>
                <Stack ml={2}>
                  <ReactMarkdown>{task.description}</ReactMarkdown>
                </Stack>
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
                  <IconButton
                    color="warning"
                    onClick={() => deleteTask(task.id)}
                  >
                    <img src="/deleteicon.svg" />
                  </IconButton>
                </Stack>

                <Stack gap={1} alignItems="center" direction="row">
                  <Typography>Finished on</Typography>
                  {task.updatedAt.slice(0, 10)}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HandleCompletedTasks;
