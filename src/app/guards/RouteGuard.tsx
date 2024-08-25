import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { ReactElement, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface GuestGuardProps {
  children: ReactElement;
  type: 'auth' | 'guest';
}

function RouteGuard({ children, type }: GuestGuardProps) {
  const [isError, setIsError] = useState(false);

  const {
    isError: isProfileError,
    isSuccess
  } = useMyDetailsQuery();

  useEffect(() => {
    if (isProfileError) {
      setIsError(true);
    }

    if (isSuccess) {
      setIsError(false);
    }
  }, [isSuccess, isProfileError]);

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
