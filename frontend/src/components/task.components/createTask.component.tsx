import {
  Alert,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor"

type task = {
  title: string;
  description: string;
  urgency: number;
  groupId: string | undefined;
  deadLine: Dayjs | undefined | string;
};

const HandleCreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState(0);
  const [groupId, setGroupId] = useState<string | undefined>();
  const [backedResponse, setBackedResponse] = useState();
  const [deadLine, setDeadline] = useState<Dayjs>();
  const [descriptionLoading, setLoading]= useState(false)
  const { id } = useParams<{ id: string}>();
  useEffect(() => {
    if (id) {
      setGroupId(id);
    }else{
      setGroupId(undefined)
    }
  }, [id]);

  const { isPending, error, mutate } = useMutation({
    mutationKey: ["createTask"],
    mutationFn: async function crateTask(data: task) {
      const response = await axiosInstance.post("/task", data);
      setBackedResponse(response.data!.message);
      return response.data;
    },
    onError: ()=>{
      setGroupId("")
                          
    },
    onSuccess: ()=>{
      setTitle("")
      setDescription("")
      setUrgency(0)
    }
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

  //call ai describe
  const describeTask = async (options:{title:string, customeDescription:string})=>{
    setLoading(true)
    const response = await axiosInstance.post("/task/ai/describe",options)
    setLoading(false)
    const {data}=response.data
    setDescription(data)
    return data

  }
 
  return (
    <Grid container columns={12} sx={{ mt: 3, justifyContent: "center" }}>
      <Grid size={{ xs: 12, sm: 12, md: 8 }}>
        {/* //TODO add time out to alert */}
        {!!backedResponse && <Alert>{backedResponse}</Alert>}
        {error && <Alert>{"Oops! Something went wrong"}</Alert>}
        <Stack sx={{ alignItems: "center" }}>
          <Typography variant="h4">Create Task</Typography>
        </Stack>
        <Stack>
          <TextField
            label="Title"
            value={title}
            sx={{mb:2}}
            onChange={(e) => setTitle(e.target.value)}
          />

          <MDEditor
            
            value={description}
            onChange={(e) => setDescription(e||"")}
            
          />    
          <Button sx={{mt:2, color:"green",}} size="medium" variant="outlined" loading={descriptionLoading} disabled={!title} onClick={()=>{
              let customeDescription = description
              const options = {
                title,
                customeDescription
                
              }
              describeTask(options)

            }}>Ask Tasky AI To Describe</Button>
          

          <Stack sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={deadLine}
                onChange={(newValue) => setDeadline(newValue ??undefined)}
              />
            </LocalizationProvider>
          </Stack>

          <Button
            type="submit"
            size="small"
            sx={{mt:2}}
            variant="outlined"
            loading={isPending}
            onClick={addTask}
            disabled={descriptionLoading||!title||!description}
          >
            Submit
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default HandleCreateTask;
