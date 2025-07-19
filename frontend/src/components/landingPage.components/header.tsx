import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material"

const HandleHeader = ()=>{
    return(
        <Box>
            <AppBar
              position="static"
              color="primary"
              sx={{ height: "5rem", justifyContent: "center" }}
            >
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  TaskTracker
                </Typography>
                <Button color="inherit" sx={{ ml: 2 }}>
                  Login
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ marginX: 2 }}
                >
                  <Typography>Get Started</Typography>
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
    )
}

export default HandleHeader;