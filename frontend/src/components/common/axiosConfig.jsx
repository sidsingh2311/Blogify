import axios from "axios";
import { token } from "./config";


const instance = axios.create({
    baseURL : import.meta.env.VITE_API_URL || "http://localhost:8000/api"
}) 

instance.interceptors.response.use((response) => {
    return response.data;
},(error) => {
    if(error.response?.status === 401) {
        window.location.href = "/login";
    }
    return Promise.reject(error);
})

instance.interceptors.request.use((config) => { 
    const tokenString = token();
    if(tokenString) {
                config.headers.Authorization = `Bearer ${tokenString}`
    }
    return config;
   
})

export default instance;