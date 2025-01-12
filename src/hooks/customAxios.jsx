import axios from "axios";
import { BaseUrl } from "./getEnv";

export const customAxios = axios.create({
    baseURL:BaseUrl
})

customAxios.interceptors.response.use((res)=>res,
(err)=>{
    if(err.response.status == 401){
        localStorage.removeItem('token');
    }
})