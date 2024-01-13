import type {ReactElement} from 'react'
import React from "react";
import {createBrowserRouter, Navigate} from 'react-router-dom'
import {selectIsAuthorized} from '@/entities/session'
import {useAppSelector} from '@/shared/model'
import HomePage from "@/pages/HomePage";
import NonFound from "@/pages/NonFound";
import AuthPage from "@/pages/AuthPage";
import {baseLayout} from "@/app/layouts/baseLayout.tsx";

type GuestGuardProps = {
    children: ReactElement
}

function GuestGuard({children}: GuestGuardProps) {
    const isAuthorized = useAppSelector(selectIsAuthorized)

    if (!isAuthorized) return <Navigate to="/login"/>

    return children
}

type AuthGuardProps = {
    children: ReactElement
}

function AuthGuard({children}: AuthGuardProps) {
    const isAuthorized = useAppSelector(selectIsAuthorized)

    if (isAuthorized) return <Navigate to="/"/>

    return children
}

export const appRouter = () =>
    createBrowserRouter([
        {
            element: baseLayout,
            errorElement: <div>error</div>,
            children: [
                {
                    path: '/',
                    element: (
                        <HomePage/>
                    ),
                },
                {
                    path: '*',
                    element: (
                        <NonFound/>
                    ),
                }
            ]
        },
    ])