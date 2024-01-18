import {BackgroundCard} from "@/shared/ui";
import {LoginForm} from "@/features/authentication/login";
import {ReactElement} from "react";


export default function LoginPage(): ReactElement {
  return (
    <section className="bg-light-gray w-full relative flex items-center justify-center">
      <LoginForm />
      <BackgroundCard />
    </section>
  )
}
