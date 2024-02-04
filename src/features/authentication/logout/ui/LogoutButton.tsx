import {Link} from "react-router-dom";
import {RefreshToken} from "@/shared/model/types.ts";
import {useLogoutMutation} from "@/entities/session/api/sessionApi.ts";


export function LogoutButton(token: RefreshToken) {
  const [logoutTrigger] = useLogoutMutation()
  const onConfirmLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()
    logoutTrigger(token)
        .unwrap()
        .catch((error) => {throw new Error(error.data.details)})
  }
  return (
      <Link to="/" onClick={onConfirmLogout}>Выйти</Link>
  )
}
