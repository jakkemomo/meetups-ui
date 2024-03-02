import type {ReactElement} from 'react'
import {createBrowserRouter, Navigate} from 'react-router-dom'
import HomePage from "@/pages/home/HomePage";
import NonFound from "@/pages/errors/NonFound";
import LoginPage from "@/pages/login/LoginPage";
import RegistrationPage from "@/pages/register/RegistrationPage";
import BaseLayout from "@/app/layouts/baseLayout.tsx";
import {AuthLayout} from "@/app/layouts/authLayout";
import ResetPasswordPage from "@/pages/reset-password/ResetPasswordPage";
import {selectAccessToken} from "@/shared/lib";

interface GuestGuardProps {
  children: ReactElement
}

function GuestGuard({children}: GuestGuardProps) {
  if (!selectAccessToken()) return <Navigate to="/login"/>

  return children
}

interface AuthGuardProps {
  children: ReactElement
}

function AuthGuard({children}: AuthGuardProps) {
  if (selectAccessToken()) return <Navigate to="/"/>

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
    element: <AuthLayout/>,
    errorElement: <div>error</div>,
    children: [
      {
        path: 'login',
        element: (
            <AuthGuard>
              <LoginPage/>
            </AuthGuard>
        ),
      },
      {
        path: 'register',
        element: (
            <AuthGuard>
              <RegistrationPage/>
            </AuthGuard>
        ),
      },
      {
        path: 'password/reset/',
        element: (
            <AuthGuard>
              <ResetPasswordPage type='ENTER_EMAIL'/>
            </AuthGuard>
        ),
      },
      {
        path: 'password/reset/confirm/',
        element: (
            <AuthGuard>
              <ResetPasswordPage type='ENTER_NEW_PASSWORD'/>
            </AuthGuard>
        ),
      },
    ]
  },
])
