import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/logedinState.store";
import HandleDrawer from "../dashboard.component/drawer";
import axiosInstance from "../../api/axios";
const HandleHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
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
              <Typography variant="h6">TaskTracker</Typography>
            </Toolbar>

            {!user && (
              <Toolbar>
                <Button
                  color="inherit"
                  sx={{ ml: 2 }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ marginX: 2 }}
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  <Typography>Get Started</Typography>
                </Button>
              </Toolbar>
            )}
          </Stack>

          {user && (
            <>
              <Stack
                direction="row"
                sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}
              >
                <Toolbar>
                  <Button
                    color="inherit"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  >
                    Home
                  </Button>

                  <Dropdown>
                    <MenuButton variant="text" sx={{ color: "inherit" }}>
                      Tasks
                    </MenuButton>

                    <Menu>
                      <MenuItem>
                        <Button
                          color="inherit"
                          sx={{ ml: 2 }}
                          onClick={() => {
                            navigate("/create-task");
                          }}
                        >
                          Add Task
                        </Button>
                      </MenuItem>
                      <MenuItem>trash</MenuItem>

                      <MenuItem>GroupTasks</MenuItem>
                    </Menu>
                  </Dropdown>

                  <Button
                    color="inherit"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      navigate("/groups");
                    }}
                  >
                    Groups
                  </Button>
                </Toolbar>

                <Toolbar>
                  <Button
                    color="inherit"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </Button>
                </Toolbar>
                <Toolbar>
                  {" "}
                  <Button
                    color="inherit"
                    sx={{ ml: 2 }}
                    onClick={async () => {
                      await axiosInstance.post("/auth/logout");
                      logout();
                      navigate("/");
                    }}
                  >
                    Logout
                  </Button>
                  <Avatar
                    sx={{
                      textTransform: "uppercase",
                      backgroundColor: "green",
                    }}
                  >
                    {user.firstName.charAt(0)}
                    {user.secondName.charAt(0)}
                  </Avatar>
                </Toolbar>
              </Stack>
              <Stack sx={{ display: { xs: "flex", sm: "none", md: "none" } }}>
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
