import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://tasky-project2.onrender.com/api",
    withCredentials:true
}
)

export default axiosInstance;