import { AxiosResponse } from "axios"
import $api, { AuthResponse } from "../api"

const LOGIN_URL = "login/"
const EVENTS_URL = "events/"
const REGISTRATION_URL = "signup/"
const LOGOUT_URL = "logout/"

export class AuthService {

    static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        // if (AuthService.validate(login, password)) {
            // return new Promise((resolve) => {
            //     resolve({
            //         data: {
            //             accessToken: "string token",
            //             refreshToken: "string token refresh",
            //             user: {
            //                 login: "login",
            //                 isActivated: true
            //             }
            //         },
            //         status: 200,
            //         statusText: "success",
            //         headers: null,
            //         config: null
            //     })
            // })
        // }
        // else {
        //     return new Promise((resolve) => {
        //         resolve({
        //             data: {
        //                 accessToken: "string token",
        //                 refreshToken: "string token refresh",
        //                 user: {
        //                     login: " ",
        //                     role: ROLE.NON_ROLE,
        //                     isActivated: false
        //                 }
        //             },
        //             status: 401,
        //             statusText: "success",
        //             headers: null,
        //             config: null
        //         })
        //     })
        // }
        //return $api.get<AuthResponse>(EVENTS_URL)

        return $api.post<AuthResponse>(LOGIN_URL, { username: username, password })
    }

    public static validate(login: string, password: string) {
        const regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        if (!login.match(regexEmail) || password.length < 4)
            return false
        else
            return true
    }

    // static async registration(): Promise<AxiosResponse<AuthResponse>>{
    //     return null
    // }

    static async logout(): Promise<AxiosResponse<AuthResponse>> {
        return $api.post(LOGOUT_URL)
    }
} 