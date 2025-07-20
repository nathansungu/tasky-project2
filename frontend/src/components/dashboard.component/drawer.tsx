import {
  Box,
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  Toolbar,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import axiosInstance from "../../api/axios";
import useUserStore from "../../store/logedinState.store";
import { useNavigate } from "react-router-dom";

function HandleDrawer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useUserStore();

  const logoutFc = async () => {
    await axiosInstance.get("/auth/logout");
    logout();
    navigate("/");
  };

  const toggleDrawer = (inOpen: boolean) => () => {
    setOpen(inOpen);
  };

  return (
    <Box sx={{ display: "flex", zIndex: 20 }}>
      <Toolbar>
        <Stack>
          <Button
            variant="outlined"
            sx={{ width: "2rem" }}
            onClick={toggleDrawer(true)}
            color="secondary"
          >
            <MenuIcon />
          </Button>
        </Stack>
      </Toolbar>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Divider />
          <List>
            {[
              { name: "Home", link: "/" },
              { name: "Tasks", link: "/tasks" },
              { name: "Group", link: "/groups" },
              { name: "Profile", link: "/profile" },
            ].map((dst, ind) => (
              <ListItem key={ind}>
                <Button
                  onClick={() => {
                    navigate(`/${dst.link}`);
                  }}
                >
                  {dst.name}
                </Button>
              </ListItem>
            ))}
            <Divider />
            <ListItem>
              <Button onClick={logoutFc}>Logout</Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default HandleDrawer;
