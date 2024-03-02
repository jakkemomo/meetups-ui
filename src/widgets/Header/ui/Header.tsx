import {InputWithFilter} from "@/features/globalFilter";
import Logo from "./Logo";
import React, {ReactElement} from "react";
import {useNavigate} from "react-router-dom";
import {ProfileButton} from "@/widgets/ProfileButton";
import {LogoutButton} from "@/features/authentication/logout";
import {Button} from "@/shared";
import {selectAccessToken, selectRefreshToken} from "@/shared/lib";

export function Header(): ReactElement {
    const navigate = useNavigate();
    const access = selectAccessToken()
    const refresh = selectRefreshToken()
    const onLoginClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        e.preventDefault()
        navigate('/login')
    }
    return (
        <header className="w-full flex items-center">
            <Logo/>
            <InputWithFilter/>
            <div className="ml-[364.4px]">
                {!access && <Button HTMLType='button' type='secondary' onClick={onLoginClick}>Войти</Button>}
                {access &&  <ProfileButton/>}
                {refresh && <LogoutButton refresh={refresh}/>}
            </div>
        </header>
    );
}