import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import { Person2 } from "@mui/icons-material";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/logedinState.store";
import HandleDrawer from "../dashboard.component/drawer";
import axiosInstance from "../../api/axios";
import { Home } from "@mui/icons-material";
const HandleHeader = () => {
  const navigate = useNavigate();
  const { user, logout, setUser } = useUserStore();
  return (
    <Box>
      <AppBar
        position="static"
        color="primary"
        sx={{ height: "5rem", justifyContent: "center" }}
      >
        <Stack direction="row" justifyContent="space-between" fontSize="bold">
          <Stack direction="row" justifyContent="space-between" fontSize="bold">
            <Toolbar>
              <Stack spacing={.4} direction="row">
                <Box
                  width="2.5rem"
                  height="2.5rem"
                  borderRadius="50%"
                  component="img"
                  src="/logo.png"
                />
                <Typography fontStyle="oblique" variant="h5">
                  TaskTracker
                </Typography>
              </Stack>
            </Toolbar>

            {!user && (
              <Toolbar>
                <Button
                  color="inherit"
                  sx={{ ml: { xs: 0.2, sm: 2, md: 2 } }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ marginX: { xs: 0.2, sm: 2, md: 2 } }}
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  <Typography>Sign UP</Typography>
                </Button>
              </Toolbar>
            )}
          </Stack>

          {user && (
            <>
              <Stack
                direction="row"
                sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
              >
                <Toolbar>
                  <IconButton
                    color="inherit"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Home /> <Typography>HOME</Typography>
                    </Stack>
                  </IconButton>

                  <Dropdown>
                    <MenuButton
                      variant="plain"
                      sx={{ color: "inherit", gap: 1 }}
                    >
                      <Box
                        width="2rem"
                        height="2rem"
                        component="img"
                        src="/to-do-list.png"
                      />
                      <Typography fontWeight={300}>TASKS</Typography>
                    </MenuButton>

                    <Menu>
                      <MenuItem>
                        <Button
                          color="success"
                          sx={{ ml: 0.5 }}
                          onClick={() => {
                            navigate("create-task");
                          }}
                        >
                          Add Task
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          sx={{ ml: 0.5 }}
                          color="success"
                          onClick={() => navigate("trash")}
                        >
                          Trash
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          sx={{ ml: 0.5 }}
                          color="success"
                          onClick={() => navigate("task/complete")}
                        >
                          Completed
                        </Button>
                      </MenuItem>
                    </Menu>
                  </Dropdown>

                  <Button
                    color="inherit"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      navigate("groups");
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        width="2rem"
                        height="2rem"
                        component="img"
                        src="/collaboration.png"
                      />{" "}
                      <Typography>Groups</Typography>
                    </Stack>
                  </Button>
                </Toolbar>

                <Toolbar>
                  <Dropdown>
                    <MenuButton variant="plain" sx={{ color: "inherit" }}>
                      <Stack direction="row" spacing={1}>
                        <Person2 color="warning" />
                        <Typography>PROFILE</Typography>
                      </Stack>
                    </MenuButton>
                    <Menu>
                      <MenuItem>
                        <Button
                          color="inherit"
                          sx={{ ml: 2 }}
                          onClick={() => {
                            navigate("profile");
                          }}
                        >
                          Setting
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          color="inherit"
                          sx={{ ml: 2 }}
                          onClick={async () => {
                            await axiosInstance.post("/auth/logout");
                            logout();
                            setUser(null);
                            navigate("/");
                          }}
                        >
                          Logout
                        </Button>
                      </MenuItem>
                    </Menu>
                  </Dropdown>
                </Toolbar>
                <Toolbar>
                  <Typography
                    sx={{ mr: 2, textTransform: "capitalize" }}
                  >{`Welcome, ${user.secondName}`}</Typography>
                  {!user.imgUrl && (
                    <Avatar
                      sx={{
                        textTransform: "uppercase",
                        backgroundColor: "green",
                      }}
                    >
                      {user.firstName.charAt(0)}
                      {user.secondName.charAt(0)}
                    </Avatar>
                  )}

                  {user.imgUrl && (
                    <Box
                      component="img"
                      src={user.imgUrl}
                      width="2.5rem"
                      height="2.5rem"
                      borderRadius="50%"
                    />
                  )}
                </Toolbar>
              </Stack>
              <Stack sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}>
                <Toolbar>
                  <HandleDrawer />
                </Toolbar>
              </Stack>
            </>
          )}
        </Stack>
      </AppBar>
    </Box>
  );
};

export default HandleHeader;
