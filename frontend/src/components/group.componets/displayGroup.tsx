import {
  Card,
  CardContent,
  Stack,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Alert,
  Button,
  Paper,
  Switch,
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import HandleMembersDrawer from "./manageMembers";
import { useNavigate } from "react-router-dom";
import type { task } from "../../DataTypes/taskTypes";
import { useQueryClient } from "@tanstack/react-query";
import CountdownDisplay from "../../utility/remainingTimeCalculastor";

const GroupCard = () => {
  const queryClient = useQueryClient();
  //fetch tasks
  const { id } = useParams<string>();
  const [bckResponse, setResponse] = useState("");
  const fetchTasks = async () => {
    const response = await axiosInstance.get(`/group/tasks/${id}`);
    return response.data;
  };
  //fetch groupDetails
  const fetchGroup = async () => {
    const response = await axiosInstance.get(`/group/${id}`);
    const { data, message } = response.data;
    setResponse(message);
    return data;
  };
  const { data: groupData, isLoading: groupIsLoading } = useQuery({
    queryKey: ["fetch group"],
    queryFn: fetchGroup,
  });
  const { data: tasksData, isLoading } = useQuery({
    queryKey: ["fetchtask"],
    queryFn: fetchTasks,
  });
  const navigate = useNavigate();

  // task operations
  //delete task
  const deleteTask = async (taskId: string) => {
    const response = await axiosInstance.delete(`/task/${taskId}`);
    const { message } = response.data!;
    return message;
  };

  const { mutate: deleteMutation, data: deleteMessage } = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: async (taskId: string) => await deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchtask"],
        refetchType: "active",
      });
    },
  });

  const toggleComplete = async (actions: {
    checked: boolean;
    idTask: string;
  }) => {
    const url = actions.checked
      ? `/task/complete/${actions.idTask}`
      : `/task/incomplete/${actions.idTask}`;
    const response = await axiosInstance.patch(url);
    const { message } = response.data;
    return message;
  };

  const { mutate: toggeleTaskMutation } = useMutation({
    mutationKey: ["toggleComplete"],
    mutationFn: async (actions: { checked: boolean; idTask: string }) =>
      await toggleComplete(actions),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchtask"],
        refetchType: "active",
      });
    },
  });
  return (
    <Grid columns={12} container justifyContent={"center"}>
      <Grid size={{ xs: 11, sm: 10, md: 9 }}>
        {groupIsLoading ||
          (isLoading && (
            <Alert severity="info">Loading Group Details, please wait...</Alert>
          ))}
        {bckResponse && <Alert severity="error">{bckResponse}</Alert>}

        {deleteMessage && <Alert>{deleteMessage}</Alert>}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          m={2}
        >
          <Typography variant="h5">
            Group:{` `}
            {groupData?.name}
          </Typography>

          <Chip
            label={`${groupData?.undoneTasks} Tasks Pening`}
            color="error"
            size="small"
          />

          <Button
            sx={{ fontSize: "1.2rem" }}
            onClick={() => navigate(`/dashboard/create-task/${id}`)}
          >
            {" "}
            Add Task
          </Button>

          <HandleMembersDrawer directive="remove" />

          <HandleMembersDrawer directive="add" />
        </Stack>

        <Card elevation={2} sx={{ mt: 2, height: "90vh", overflow: "scroll" }}>
          <CardContent>
            <Typography sx={{ fontStyle: "italic", mb: 2 }}>
              {groupData?.description.slice(0, 50)}
            </Typography>
            {tasksData?.message ||
              (groupData?.message && (
                <Alert severity="error">
                  {groupData.message || tasksData.message}
                </Alert>
              ))}
            <List dense>
              <Stack spacing={2}>
                {tasksData?.data?.map((task: task) => (
                  <Paper elevation={3} key={task.id}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{ alignItems: "flex-start" }}
                    >
                      <Stack direction="row" sx={{ alignItems: "center" }}>
                        <ListItemIcon sx={{ mt: 0.5 }}>
                          <CheckCircleOutlineIcon
                            sx={{ color: task.iscompleted ? "green" : "red" }}
                            fontSize="small"
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              color="text.primary"
                            >
                              {task.title}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              mt=".5rem"
                              variant="body2"
                              color="text.secondary"
                            >
                              {task.description}
                            </Typography>
                          }
                        />
                      </Stack>
                    </ListItem>
                    <ListItem>
                      <Stack
                        height="5rem"
                        direction="row"
                        alignItems="center"
                        ml={{ xs: 0.5, sm: 3, md: "6%" }}
                        spacing={1}
                      >
                        <Stack direction="row" alignItems="center">
                          <Typography>Pending</Typography>
                          <Switch
                            checked={task.iscompleted}
                            onChange={(_event, checked) => {
                              const idTask = task.id;
                              const actions = { checked, idTask };

                              toggeleTaskMutation(actions);
                            }}
                          ></Switch>
                          <Typography>Done</Typography>
                        </Stack>
                        <Stack direction="row">
                          <Button onClick={() => deleteMutation(task.id)}>
                            <img src="/deleteicon.svg" />
                          </Button>{" "}
                          <Button
                            color="inherit"
                            onClick={() => navigate(`task/update`)}
                          >
                            update
                          </Button>
                        </Stack>
                      </Stack>
                    </ListItem>
                    <ListItem>
                      <Stack mt={0} ml={{ xs: 0.5, sm: 3, md: "6%" }}>
                        <CountdownDisplay deadline={task.deadLine} />
                      </Stack>
                    </ListItem>
                  </Paper>
                ))}
              </Stack>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default GroupCard;
