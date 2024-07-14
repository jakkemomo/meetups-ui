import { useLazyMyDetailsQuery } from "@/entities/profile/api/profileApi";
import { useLazyConfirmEmailQuery } from "@/entities/session/api/sessionApi";
import { ReactElement, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface IProxyConfirmEmailPageProps {
  type: 'register' | 'security';
}

function ProxyConfirmEmailPage({ type }: IProxyConfirmEmailPageProps): ReactElement {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  const [confirmEmail] = useLazyConfirmEmailQuery();
  const [getProfile] = useLazyMyDetailsQuery();

  useEffect(() => {
    if (!token) {
      navigate('/', { replace: true });
    } else {
      confirmEmail(token)
        .then(() => {
          navigate(type === 'security' ? '/security' : '/', { replace: true });
          type === 'security' && getProfile()
            .unwrap()
            .then(() => {return})
            .catch((err) => console.log(err))
        })
        .catch((err) => {
          navigate(type === 'security' ? '/security' : '/', { replace: true });
          console.log(err);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <></>
  )
}

export default ProxyConfirmEmailPage;
