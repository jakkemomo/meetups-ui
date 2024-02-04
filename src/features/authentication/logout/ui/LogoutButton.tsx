import {Link} from "react-router-dom";
import {RefreshToken} from "@/shared/model/types.ts";
import {useLogoutMutation} from "@/entities/session/api/sessionApi.ts";
import {Button} from "@/shared";
import React from "react";


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
      <Link to="/" onClick={onConfirmLogout}>
        <Button HTMLType='button' type='secondary'>Выйти</Button>
      </Link>
  )
}
