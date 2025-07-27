import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://tasky-project2.vercel.app/api",
    withCredentials:true
}
)

export default axiosInstance;