import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/logedinState.store";
import HandleDrawer from "../dashboard.component/drawer";
const HandleHeader = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  return (
    <Box>
      <AppBar
        position="static"
        color="primary"
        sx={{ height: "5rem", justifyContent: "center" }}
      >
        <Stack direction="row" justifyContent="space-between" fontSize="bold">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              TaskTracker
            </Typography>

            {!user && (
              <>
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
              </>
            )}
          </Toolbar>

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
                      navigate("/login");
                    }}
                  >
                    Home
                  </Button>

                  <Button
                    color="inherit"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Tasks
                  </Button>

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
                      navigate("/login");
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
                    onClick={() => {
                      navigate("/login");
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
