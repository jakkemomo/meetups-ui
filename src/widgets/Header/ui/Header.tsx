import {InputWithFilter} from "@/features/globalFilter";
import Logo from "./Logo";
import React, {ReactElement, useState} from "react";
import {selectAccessToken, selectIsAuthorized, selectRefreshToken, useAppSelector} from "@/shared/model";
import {Link} from "react-router-dom";
import {LayoutProfileCard} from "@/widgets/LayoutProfileCard";
import {LogoutButton} from "@/features/authentication/logout";
import {Button} from "@/shared";

export function Header(): ReactElement {
    const isAuthorized: boolean = useAppSelector(selectIsAuthorized)
    const refreshToken: string | undefined = useAppSelector(selectRefreshToken)
    const accessToken: string | undefined = useAppSelector(selectAccessToken)

    return (
        <header className="w-full flex items-center">
            <Logo/>
            <InputWithFilter/>
            {/*<div className="bg-burger-menu-icon w-7 h-[25px] bg-cover bg-no-repeat bg-center ml-[364.4px] cursor-pointer"></div>*/}
            {!isAuthorized && (
                <div className="ml-[364.4px]">
                    <Link to="/login">
                        <Button HTMLType='button' type='secondary'>Войти</Button>
                    </Link>
                </div>
            )}
            {refreshToken && accessToken && (
                <div className="ml-[364.4px]">
                    <LayoutProfileCard access={accessToken}/>
                    <LogoutButton refresh={refreshToken}/>
                </div>
            )}
        </header>
    );
}