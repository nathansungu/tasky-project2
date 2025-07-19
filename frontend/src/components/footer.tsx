import { Box, Grid, Typography, Stack, Button } from "@mui/material";

const Handlefooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        color: "white",
        textAlign: "center",
        py: 4,
        px: 2,
        mt: "auto",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Quick Links */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Stack spacing={1}>
            <Button color="inherit" size="small">
              Home
            </Button>
            <Button color="inherit" size="small">
              Features
            </Button>
            <Button color="inherit" size="small">
              Login
            </Button>
            <Button color="inherit" size="small">
              Sign Up
            </Button>
          </Stack>
        </Grid>

        {/* Contact */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2">Email: nathanamudavi.com</Typography>
          <Typography variant="body2">Phone: +254 758275707</Typography>
        </Grid>

        {/* Social Icons (Optional) */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button color="inherit" size="small">
              Facebook
            </Button>
            <Button color="inherit" size="small">
              Twitter
            </Button>
            <Button color="inherit" size="small">
              LinkedIn
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="grey.400">
          &copy; {new Date().getFullYear()} CodeyTasks. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Handlefooter;
