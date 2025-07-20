import {
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const features = [
  {
    title: "Organize Tasks",
    description: "Create, update, and delete your daily tasks easily.",
  },
  {
    title: "Set Deadlines",
    description: "Never miss a task with smart reminders.",
  },
  {
    title: "Track Progress",
    description: "Visualize what you've accomplished with completion stats.",
  },
];
const HandleHerosection = () => {
  const navigate = useNavigate()
  return (
    <>
      
        <Grid container direction="column" sx={{width:"99%"}}>
          

          <Box sx={{ backgroundColor: "background.default", py: 8 }}>
            <Container sx={{ minHeight: "22vh" }}>
              <Typography variant="h3" sx={{ m: 3 }}>
                Stay Focused, Stay Organized
              </Typography>
              <Typography variant="h4" color="text.secondary" sx={{ m: 1 }}>
                TaskTracker helps you manage your tasks, meet deadlines, and
                boost productivity.
              </Typography>
              <Button
                variant="contained"
                size="large"
                color="primary"
                sx={{ m: 2 }}
                onClick={()=>{
                  navigate("/register")
                }}
              >
                Try It Free
              </Button>
            </Container>
          </Box>

          <Box sx={{ py: 6, backgroundColor: "grey.100" }}>
            <Container>
              <Typography variant="h4" align="center" gutterBottom>
                Features
              </Typography>
              <Grid container columns={12} spacing={4}>
                {features.map((feature, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                    <Card elevation={3} sx={{ height: "11rem" }}>
                      <CardContent>
                        <Typography variant="h4" gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          <Box sx={{ py: 6, backgroundColor: "primary.main", color: "white" }}>
            <Container sx={{ height: "15rem" }}>
              <Typography variant="h4" gutterBottom>
                Ready to get productive?
              </Typography>
              <Typography variant="body1">
                Start using TaskTrackr today and stay on top of your goals.
              </Typography>
              <Button
                sx={{ mt: 3 }}
                variant="contained"
                color="secondary"
                size="large"
                onClick={()=>{
                  navigate("/login")
                }}
              >
                Create Account
              </Button>
            </Container>
          </Box>
        </Grid>
      
    </>
  );
};

export default HandleHerosection;
