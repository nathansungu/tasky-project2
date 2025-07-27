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
import { useQuery } from "@tanstack/react-query";
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
  directive: { fetch: string; action: string };
};

function HandleMembersDrawer({ directive }: Props) {
  const { id } = useParams<string>();
  const [bckResponse, setBckResponse] = useState("");

  //fetch members
  const fetchUsers = async () => {
    const url =
      directive.action === "remove" ? `/group/members/${id}` : `/user`;
    const response = await axiosInstance.get(url);
    const { data, message } = response.data;
    setBckResponse(message);
    return data;
  };
  //remove or add user
  const manageMember = async (groupId: string) => {
    const url =
      directive.action === "remove"
        ? `/group/member/${groupId}`
        : `/group/members${groupId}`;
    const response = await axiosInstance.patch(url);
    const { message } = response.data;
    setBckResponse(message);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["fetchMembers"],
    queryFn: fetchUsers,
  });
  console.log(data);
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
              color: directive.action == "add" ? "primary.main" : "error.main",
            }}
          >
            {directive.action === "remove" && <GroupIcon />}
            {directive.action === "add" && <AddIcon />}
          </IconButton>
        </Stack>
      </Toolbar>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <Divider />

          <List>
            <ListItem sx={{ fontSize: "1.3rem" }}>Group Members</ListItem>
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
                      <Stack>
                        <Stack
                          direction="row"
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
                            <IconButton onClick={() => manageMember(dst.id)}>
                              <RemoveIcon />
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
