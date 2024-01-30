import {BackgroundCard} from "@/shared";
import {LoginForm} from "@/features/authentication/login";
import {ReactElement, useCallback} from "react";
import {useNavigate} from "react-router-dom";


export default function LoginPage(): ReactElement {
  const navigate = useNavigate();

  const onComplete = useCallback(() => {
    navigate('/')
  }, [navigate]);

  return (
    <section className="bg-transparent-gray w-full h-full relative flex items-center justify-center">
      <LoginForm onComplete={onComplete} />
      <BackgroundCard cardType='LOGIN' />
    </section>
  )
}
