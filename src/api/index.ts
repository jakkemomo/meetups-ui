import axios from "axios"

export type User = {
    login : string
    isActivated : boolean
}

export type AuthResponse = {
    access: string,
    refresh: string,
    user: User
}

export const BASE_URL_API = "https://meetups-dev-6vuzexfx2q-lm.a.run.app/api/v1/"

const $api = axios.create({
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    baseURL: BASE_URL_API
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
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