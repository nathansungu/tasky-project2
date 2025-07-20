import {Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import axiosInstance from "../../api/axios";
import { useEffect, useState } from "react";

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
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const fetchUrgentTask = async () => {
    setIsLoading(true)
    const response = await axiosInstance.get("/task");
    const { data } = response.data;
    setTasks(data);
    console.log(data)
    setIsLoading(false)
    return data;
  };

  useEffect(() => {
    async function getTask() {
      try {
        await fetchUrgentTask();
        setError(false);
      } catch (e) {
        setError(true);
        setIsLoading(false)
      }
    }
    getTask();
  }, []);
  return (
    <>
    {error && (
          <Stack
            sx={{ mt:"30%", justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                textAlign: "center",
                color: "red",
                fontSize: "1.5rem",
              }}
            >
              failed to fetch feeds
            </Typography>
          </Stack>
        )}
        {isLoading && (
          <Stack
            sx={{ width: "100%", height: "50vh", justifyContent: "center" }}
          >
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
      <Grid container columns={12}>
        {tasks.map((task: task) => (
          <Grid key={task.id}>
            <Card>
              <CardContent>
                <Typography>{task.title}</Typography>
                <Typography>{task.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default UrgentTaskCard;
