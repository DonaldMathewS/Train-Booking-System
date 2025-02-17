import axios from "axios"


const axiosInstance = axios.create({
    baseURL: "http://localhost:1998/api"
})

export default axiosInstance