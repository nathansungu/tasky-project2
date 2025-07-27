import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://tasky-project2.onrender.com",
    withCredentials:true
}
)

export default axiosInstance;