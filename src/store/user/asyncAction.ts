import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthService} from "../../service/Auth";
import {AuthResponse, RegisterResponse} from "../../api";

export type LoginParams = {
    username: string,
    password: string
}

export type RegisterParams = {
  username: string,
  email: string,
  password: string,
  password2: string
}

export const login = createAsyncThunk<AuthResponse, LoginParams>(
  "user/loginStatus",
  async (params) => {
  //     if(!AuthService.validate(params.login, params.password)){
  //         return new Promise((resolve => resolve))
  //    }
    if (localStorage.getItem("user")) {
        return new Promise((reject => reject(JSON.parse(localStorage.getItem("user") as string))))
    } else {
        const response = await AuthService.login(params.username, params.password)
        localStorage.setItem("token", response.data.access)
        return response.data;
    }
  },
)

export const register = createAsyncThunk<RegisterResponse, RegisterParams>(
  "registration/registerStatus",
  async (params) => {
    const response = await AuthService.registration(params.username, params.email, params.password, params.password2);
    return response.data;
  },
)
