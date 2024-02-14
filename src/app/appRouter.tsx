import type {ReactElement} from 'react'
import {createBrowserRouter, Navigate} from 'react-router-dom'
import {useAppSelector} from '@/shared/model';
import NonFound from "@/pages/errors/NonFound";
import LoginPage from "@/pages/login/LoginPage";
import RegistrationPage from "@/pages/register/RegistrationPage";
import BaseLayout from "@/app/layouts/baseLayout.tsx";
import {AuthLayout} from "@/app/layouts/authLayout";
import ResetPasswordPage from "@/pages/reset-password/ResetPasswordPage";
import {selectIsAuthorized} from "@/entities/session";
import { HomePage } from '@/pages/home/HomePage';

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
  const isAuthorized = useAppSelector(selectIsAuthorized);

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
          <HomePage />
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
    element: <AuthGuard><AuthLayout /></AuthGuard>,
    errorElement: <div>error</div>,
    children: [
      {
        path: 'login',
        element: <LoginPage/>,
      },
      {
        path: 'register',
        element: <RegistrationPage/>,
      },
      {
        path: 'password/reset/',
        element: <ResetPasswordPage type='ENTER_EMAIL'/>,
      },
      {
        path: 'password/reset/confirm/',
        element: <ResetPasswordPage type='ENTER_NEW_PASSWORD'/>,
      },
    ]
  },
])
