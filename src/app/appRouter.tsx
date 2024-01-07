import {FC} from "react";
import type { ReactElement } from 'react'
import {Navigate, BrowserRouter, Routes, Route} from 'react-router-dom'
import { selectIsAuthorized } from '@/entities/session'
import { useAppSelector } from '@/shared/model'
import AuthPage from "@/pages/AuthPage";
import HomePage from "@/pages/HomePage";
import NonFound from "@/pages/NonFound";

type GuestGuardProps = {
  children: ReactElement
}

function GuestGuard({ children }: GuestGuardProps) {
  const isAuthorized = useAppSelector(selectIsAuthorized)

  if (!isAuthorized) return <Navigate to="/login" />

  return children
}

type AuthGuardProps = {
  children: ReactElement
}

function AuthGuard({ children }: AuthGuardProps) {
  const isAuthorized = useAppSelector(selectIsAuthorized)

  if (isAuthorized) return <Navigate to="/" />

  return children
}

export const appRouter: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='*' element={<NonFound/>}/>
                <Route path='/registration' element={<AuthPage type="registration"/>}/>
              <Route path='/login' element={
                <AuthGuard>
                  <AuthPage type="login"/>
                </AuthGuard>
              }/>
            </Routes>
        </BrowserRouter>
    );
};
export default appRouter;