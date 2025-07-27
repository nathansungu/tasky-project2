import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../api/axios";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import type { task } from "../../DataTypes/taskTypes";
import { CalendarMonth } from "@mui/icons-material";
import toDateTime from "../../utility/dateTostringConverter";
import calculateRemainingTime from "../../utility/remainingTimeCalculastor";
import { RestoreFromTrashRounded } from "@mui/icons-material";



const HandleTrash = () => {
  const queryClient = useQueryClient()
  const fetchTrashTask = async () => {
    const response = await axiosInstance.get("/task/deleted");
    const { data, message } = response.data!;
    return data;
  };
  const { data, isPending } = useQuery({
    queryKey: ["fetchTrashTasks"],
    queryFn: fetchTrashTask,
  });
  
  const restoreTask = async (id: string) => {
    const response = await axiosInstance.patch(`/task/restore/${id}`);
    const { message } = response.data;
    return message;
  };

  const { data: updateResponse, mutate } = useMutation({
    mutationKey: ["restoreTask"],
    mutationFn: async (id: string) => await restoreTask(id),   
    onSuccess: () => {
     queryClient.invalidateQueries({queryKey:["fetchTrashTasks"], refetchType:"active"})

    },
  });

  return (
    <>
      {updateResponse && <Alert>{updateResponse}</Alert>}
      {isPending&& <Alert>{"Loading Tasks. Please wait"}</Alert>}
      <Grid container columns={12} alignItems="center" mt={2} spacing={2}>
        {data &&
          data.map((task: task) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={task.id}>
              <Card sx={{ minHeight: "22rem" }}>
                <CardContent
                  sx={{ minHeight: "10rem", backgroundColor: "grey.100" }}
                >
                  <Typography fontSize="1.5rem">{task.title}</Typography>
                  <Typography>{task.description}</Typography>
                </CardContent>
                <CardContent>
                  
                  
                    <Button
                      color="success"
                      sx={{gap:2, fontSize:"1.3rem"}}
                      onClick={() => {
                        mutate(task.id);
                      }}
                    >
                      <RestoreFromTrashRounded/> Restore
                    </Button>
                

                  <Stack
                    direction="column"
                    sx={{ justifyContent: "center", gap: "10%" ,ml:1.5}}
                  >
                    <Stack gap={1} alignItems="center" direction="row">
                      <CalendarMonth sx={{ backgroundColor: "grey.200" }} />
                      {toDateTime(task.updatedAt)}
                    </Stack>

                    
                    <Stack direction="row" sx={{ mt: 1.5 }} gap={2}>
                      {task.updatedAt && (
                        <>
                          <Typography color="warning">Permanent delete in:</Typography>

                          {(() => {
                            const remainingTime = calculateRemainingTime(
                              task.updatedAt
                            );
                            return (
                              <Typography color="red" fontWeight="bold">
                                {`${remainingTime?.days}.
                          ${remainingTime?.hours}. ${remainingTime?.minutes}. ${remainingTime?.seconds}`}
                                {}
                              </Typography>
                            );
                          })()}
                        </>
                      )}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default HandleTrash;
