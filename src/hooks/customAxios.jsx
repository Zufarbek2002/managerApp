import axios from "axios";
import { BaseUrl } from "./getEnv";

export const customAxios = axios.create({
    baseURL:BaseUrl
})