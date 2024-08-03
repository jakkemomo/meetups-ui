import {createBrowserRouter} from 'react-router-dom'
import NonFound from "@/pages/errors/NonFound";
import LoginPage from "@/pages/login/LoginPage";
import RegistrationPage from "@/pages/register/RegistrationPage";
import BaseLayout from "@/app/layouts/baseLayout.tsx";
import {AuthLayout} from "@/app/layouts/authLayout";
import ResetPasswordPage from "@/pages/reset-password/ResetPasswordPage";
import AddEventPage from "@/pages/add-event/AddEventPage";
import {HomePage} from "@/pages/home/HomePage.tsx";
import { EventPage } from '@/pages/event/EventPage';
import CurrentProfileView from "@/pages/profile/CurrentProfileView"
import RemoteProfileView from "@/pages/profile/RemoteProfileView"
import EditProfile from '@/pages/profile/EditProfile';
import SecurityPage from '@/pages/security/SecurityPage';
import ProxyConfirmEmailPage from '@/features/authentication/registration/ui/ProxyConfirmEmailPage';
import RouteGuard from './guards/RouteGuard';
import { UserEventsPage } from '@/pages/userEvents/UserEventsPage';

const appRouter = createBrowserRouter([
  {
    element: <RouteGuard type="guest"><BaseLayout /></RouteGuard>,
    errorElement: <div>error</div>,
    children: [
      {
        path: '/security',
        element: (
          <SecurityPage />
        )
      },
      {
        path: '/security/email/confirm',
        element: <ProxyConfirmEmailPage type='security' />
      },
      {
        path: '/events/:eventId/edit',
        element: (
          <AddEventPage type='edit' />
        )
      },
      {
        path: '/profile/me',
        element: (
          <CurrentProfileView/>
        ),
      },
      {
        path: '/profile/:userId',
        element: (
          <RemoteProfileView/>
        )
      },
      {
        path: '/profile/edit',
        element: (
          <EditProfile/>
        ),
      },
      {
        path: '/event/add',
        element: (
          <AddEventPage type='add' />
        ),
      },
      {
        path: '/favorite',
        element: (
          <UserEventsPage type="favorite" />
        )
      },
      {
        path: '/planned',
        element: (
          <UserEventsPage type="planned" />
        )
      },
      {
        path: '/created',
        element: (
          <UserEventsPage type="created" />
        )
      }
    ]
  },
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
        path: '/events/:eventId',
        element: (
          <EventPage/>
        )
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
    element: <RouteGuard type="auth"><AuthLayout/></RouteGuard>,
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
        path: 'register/email/confirm',
        element: <ProxyConfirmEmailPage type='register' />
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

export default appRouter;
