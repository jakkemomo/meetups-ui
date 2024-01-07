// todo: remove
import axios from "axios"
import { BASE_URL_API } from "@/shared/config"
import {AuthResponse} from "@/entities/session/api/types";


const $api = axios.create({
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    baseURL: BASE_URL_API
})

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = { ...error.config };
        originalRequest._isRetry = true;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            try {
                const resp = await $api.get<AuthResponse>("/api/refresh");
                localStorage.setItem("token", resp.data.access);
                return $api.request(originalRequest);
            } catch (error) {
                console.log("AUTH ERROR");
            }
            throw error;
        }
    }
)

export default $api
