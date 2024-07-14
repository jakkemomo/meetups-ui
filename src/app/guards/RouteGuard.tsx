import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface GuestGuardProps {
  children: ReactElement;
  type: 'auth' | 'guest';
}

function RouteGuard({ children, type }: GuestGuardProps) {
  const {
    isError,
    isSuccess
  } = useMyDetailsQuery();

  if (isError && type === 'guest') {
    return <Navigate to="/" replace />
  }

  if (isError && type === 'auth') {
    return children;
  }

  if (isSuccess && type === 'auth') {
    return <Navigate to="/" replace />
  }

  if (isSuccess) {
    return children;
  }
}

export default RouteGuard;
