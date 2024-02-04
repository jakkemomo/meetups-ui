import {RefreshToken} from "@/shared/model/types.ts";
import {useLogoutMutation} from "@/entities/session/api/sessionApi.ts";
import {Button} from "@/shared";
import React from "react";
import {useNavigate} from "react-router-dom";


export function LogoutButton(token: RefreshToken) {
    const [logoutTrigger] = useLogoutMutation()
    const navigate = useNavigate();

    const onConfirmLogout = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        e.preventDefault()
        logoutTrigger(token)
            .unwrap()
            .then(() => navigate('/'))
            .catch((error) => {
                throw new Error(error.data.details)
            })
    }
  return (
      <Button HTMLType='button' type='secondary' onClick={onConfirmLogout}>Выйти</Button>
  )
}
