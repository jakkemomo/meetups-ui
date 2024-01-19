import type {ReactElement} from 'react'
import {createBrowserRouter, Navigate} from 'react-router-dom'
import {selectIsAuthorized} from '@/entities/session'
import {useAppSelector} from '@/shared/model'
import HomePage from "@/pages/home/HomePage";
import NonFound from "@/pages/errors/NonFound";
import LoginPage from "@/pages/login/LoginPage";
import BaseLayout from "@/app/layouts/baseLayout.tsx";
import {AuthLayout} from "@/app/layouts/authLayout";

interface GuestGuardProps {
  children: ReactElement
}

function GuestGuard({children}: GuestGuardProps) {
  const isAuthorized = useAppSelector(selectIsAuthorized)

  if (!isAuthorized) return <Navigate to="/login"/>

  return children
}

interface AuthGuardProps {
  children: ReactElement
}

function AuthGuard({children}: AuthGuardProps) {
  const isAuthorized = useAppSelector(selectIsAuthorized)

  if (isAuthorized) return <Navigate to="/"/>

  return children
}

export const appRouter = createBrowserRouter([
  {
    element: <BaseLayout />,
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
  {
    element: <AuthLayout />,
    errorElement: <div>error</div>,
    children: [
     {
        path: 'login',
        element: <LoginPage/>,
      },
    ]
  },
])
