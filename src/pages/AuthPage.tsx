import { FC } from "react"
import Registation from "../component/Auth/Registration"
import Login from '../component/Auth/Login/index';

type Prop = {
    type : "registration" | "login"
}

const AuthPage : FC<Prop> = ({type}) => {
    return (
        <section className="bg-gray-50 dark:bg-gray-900 w-full">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    Meetup
                </p>
                {type === "registration" ? <Registation /> : <Login />}
            </div>
        </section>
    )
}

export default AuthPage