import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../service/Auth";
import { User } from "../../api";

export type LoginParams = {
    login: string,
    password: string
}

export const login = createAsyncThunk<User, LoginParams>(
    "user/loginStatus",
    async (params) => {
    //     if(!AuthService.validate(params.login, params.password)){
    //         return new Promise((resolve => resolve))
    //    }
        if (localStorage.getItem("user")) {
            return new Promise((reject => reject(JSON.parse(localStorage.getItem("user") as string))))
        } else {
            const response = await AuthService.login(params.login, params.password)
            localStorage.setItem("token", response.data.access)
            return response.data.user
        }
    },

)