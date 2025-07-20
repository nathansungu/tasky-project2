import { Button, Stack, TextField,Grid } from "@mui/material";
import { useState } from "react";
import axiosInstance from "../api/axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/logedinState.store";

const HandleLoginComponent = () => {

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate=  useNavigate()
    const {setUser} = useUserStore()


    const {isPending,isError, mutate} = useMutation({
        mutationKey: ["login"],
        mutationFn: async (loginData:{identifier:String, password:String}) => {
            const response = await axiosInstance.post("/auth/login", loginData);
            const {data} = response.data
            setUser(data)
            return response.data;
        },
        onSuccess: () => {
            setErrorMessage("");
            setIdentifier("");
            setPassword("");

            navigate("/dashboard");
        },
        onError: (error:any) => {
            const reError = error.response?.data || error.message 
            setErrorMessage(reError.message);           
        }

    })

    const handleFormSubmition = ()=>{        
        const loginData = {
            identifier,
            password
        };

        mutate(loginData);
    }
  return (
    <>
      <Stack>
        <form>
          {isError && (
            <Stack sx={{ color: "red", textAlign: "center", m: 2, fontSize: "1.2rem" , textTransform: "capitalize"}}>
              <p>{errorMessage}</p>
            </Stack>  
          )}  
          <Grid container  spacing={2} sx={{ mt: 2 }}>
            <Stack direction="column" spacing={2} sx={{ width: { xs: "90%", sm: "70%", md: "50%" }, mx: "auto" }}>
              <TextField
                type="text"
                placeholder="Username or Email"
                required
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />

              <TextField
                type="password"
                placeholder="Password"
                required
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}   
              />

              <Button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#3f51b5",
                  color: "white",
                }}
                loading={isPending}
                onClick={(e) => {
                  e.preventDefault();
                  handleFormSubmition();
                }}
              >
                {isPending ? "Logging in..." : "Login"}
              </Button >
            </Stack>
          </Grid>
        </form>
      </Stack>
    </>
  );
};

export default HandleLoginComponent;
