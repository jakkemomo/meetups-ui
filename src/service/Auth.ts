import { AxiosResponse } from "axios"
import $api from "../api"
import { LOGIN_URL, REGISTRATION_URL, LOGOUT_URL } from "../shared/config"
import {AuthResponse, RegisterResponse} from "@/entities/session/api/types";

export class AuthService {

    static async login(
        username: string,
        password: string,
        ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(LOGIN_URL, { username, password })
    }

    static async registration(
        username: string,
        email: string,
        password: string,
        password2: string,
    ): Promise<AxiosResponse<RegisterResponse>>{
        return $api.post<RegisterResponse>(
            REGISTRATION_URL, { username, email, password, password2 }
        )
     }

    static async logout(): Promise<AxiosResponse<AuthResponse>> {
        return $api.post(LOGOUT_URL)
    }
}
