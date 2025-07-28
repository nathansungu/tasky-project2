import {
  Alert,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useParams } from "react-router-dom";

type task = {
  title: string;
  description: string;
  urgency: number;
  groupId: string | undefined;
  deadLine: Dayjs | undefined | string;
};

const HandleUpdateTask = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [urgency, setUrgency] = useState<number>(0);
  const [groupId, setGroupId] = useState<string | undefined>();
  const [backedResponse, setBackedResponse] = useState("");
  const [deadLine, setDeadline] = useState<Dayjs>();
  const [tasks, setTask] = useState<task>();
  const { id } = useParams<{ id: string }>();

  //fetch task content
  const fetchTask = async () => {
    const response = await axiosInstance.get(`/task/${id}`);
    const { data } = response.data;
    setTask(data);
  };
  useEffect(() => {
    try {
      fetchTask;
      if (tasks) {
        setTitle(tasks?.title);
        setDescription(tasks.description);
        setUrgency(tasks.urgency);
        console.log(tasks)
        // setDeadline(tasks?.deadLine)
      }
    } catch (error) {
        console.log(error)
      setBackedResponse("Oops! Something went wrong");
    }
  });

  const { isPending, error, mutate } = useMutation({
    mutationKey: ["createTask"],
    mutationFn: async function crateTask(data: task) {
      const response = await axiosInstance.patch("/task", data);
      setBackedResponse(response.data!.message);
      return response.data;
    },
    onError: () => {
      setGroupId("");
    },
    onSuccess: () => {
      setTitle("");
      setDescription("");
      setUrgency(0);
    },
  });

  const addTask = () => {
    const data = {
      title,
      description,
      urgency,
      groupId,
      deadLine: deadLine ? deadLine.toISOString() : undefined,
    };
    mutate(data);
  };
  return (
    <Grid container columns={12} sx={{ mt: 3, justifyContent: "center" }}>
      <Grid size={{ xs: 12, sm: 12, md: 8 }}>
        {!!backedResponse && <Alert>{backedResponse}</Alert>}
        {error && <Alert>{"Oops! Something went wrong"}</Alert>}
        <Stack sx={{ alignItems: "center" }}>
          <Typography variant="h4">Update Task</Typography>
        </Stack>
        <Stack>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Description"
            sx={{ mt: 2 }}
            multiline
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Stack sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={deadLine}
                onChange={(newValue) => setDeadline(newValue ?? undefined)}
              />
            </LocalizationProvider>
          </Stack>

          <Button
            type="submit"
            size="large"
            loading={isPending}
            onClick={addTask}
          >
            Update
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default HandleUpdateTask;
