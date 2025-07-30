import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  Toolbar,
  Stack,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Typography,
  Alert,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/PersonRemove";
import { useState } from "react";
import axiosInstance from "../../api/axios";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CalendarMonth } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/PersonAdd";
type members = {
  id: string;
  groupId: string;
  userId: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  user: {
    firstName: string;
    secondName: string;
  };
};
type Props = {
  directive: string;
};
type addMember = { groupId: string|undefined; userId: string };

function HandleMembersDrawer({ directive }: Props) {
  const { id } = useParams<string>();
  const [bckResponse, setBckResponse] = useState("");

  //fetch members or all users
  const fetchUsers = async () => {
    if (directive === "add") {
      const response = await axiosInstance.get("/user");
      const { data, message } = response.data;
      setBckResponse(message);
      return data;
    } else if (directive === "remove") {
      const response = await axiosInstance.get(`/group/members/${id}`);
      const { data, message } = response.data;
      setBckResponse(message);
      return data;
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ["fetchMembers", directive, id],
    queryFn: fetchUsers,
  });

  //remove or add user
  const manageMember = async (data: addMember) => {
    if (directive === "remove") {
      const response = await axiosInstance.patch(
        `/group/member/`,data
      );
      const { message } = response.data;
      setBckResponse(message);
      return message;
    } else if (directive === "add") {
      const response = await axiosInstance.patch(`/group/members`, data);
      const { message } = response.data;
      setBckResponse(message);
      return message;
    }
  };

  const {
    data: manageUSerResponse,
    mutate,
    isPending,
  } = useMutation({
    mutationKey: ["manageUser"],
    mutationFn: manageMember,
    onSuccess: () => {
      setBckResponse(manageUSerResponse);
    },
  });

  const [open, setOpen] = useState(false);

  const toggleDrawer = (inOpen: boolean) => () => {
    setOpen(inOpen);
  };

  return (
    <Box sx={{ display: "flex", zIndex: 20 }}>
      <Toolbar>
        <Stack>
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              color: directive == "add" ? "primary.main" : "error.main",
            }}
          >
            {directive === "remove" && <GroupIcon />}
            {directive === "add" && <AddIcon />}
          </IconButton>
        </Stack>
      </Toolbar>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box>
          <Divider />

          <List>
            <ListItem sx={{ fontSize: "1.3rem" }}><Typography variant="h5">{directive==="remove"?"Group Members":"ADD Members"}</Typography></ListItem>
            {isLoading && <Alert>Loading Members. Please wait ..</Alert>}
            {bckResponse && <Alert>{bckResponse}</Alert>}
            {data?.map((dst: members) => (
              <Box key={dst.id}>
                <Card>
                  <CardContent>
                    <Stack direction="row" gap={1} alignItems="center">
                      <Avatar
                        sx={{
                          textTransform: "capitalize",
                          backgroundColor: "grey",
                        }}
                      >
                        <Typography>{dst.user!.firstName.charAt(0)}</Typography>
                        <Typography>
                          {dst.user!.secondName.charAt(0)}
                        </Typography>
                      </Avatar>
                      <Stack >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          gap={1}
                          sx={{
                            textTransform: "capitalize",
                            alignItems: "center",
                          }}
                        >
                          <Typography fontSize="1.2rem">
                            {dst.user.firstName}
                          </Typography>
                          <Typography fontSize="1.2rem">
                            {" "}
                            {dst.user.secondName}
                          </Typography>
                          {dst.role != "admin" && (
                            <IconButton
                              loading={isPending}
                              onClick={() => {
                                if (dst.id) {
                                  const userId = dst.id;
                                  const groupId = id;
                                  const data = {
                                    groupId,
                                    userId,
                                  };
                                  console.log(data);
                                  mutate(data);
                                }
                              }}
                            >
                              {directive && directive === "add" ? (
                                <AddIcon />
                              ) : (
                                <RemoveIcon />
                              )}
                            </IconButton>
                          )}
                        </Stack>

                        <Stack direction="row" gap={1}>
                          <CalendarMonth />
                          <Typography>{dst.updatedAt!.slice(0, 10)}</Typography>
                        </Stack>
                        <Stack>
                          {dst.role == "admin" && (
                            <Typography textTransform="capitalize" color="red">
                              user: {`   ${dst.role}`}
                            </Typography>
                          )}
                        </Stack>
                        <Stack>
                          {dst.role == "user" && (
                            <Typography
                              textTransform="capitalize"
                              color="green"
                            >
                              user: {`   ${dst.role}`}
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Divider />
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default HandleMembersDrawer;
