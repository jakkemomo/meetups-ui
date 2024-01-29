import {useAppDispatch} from '@/shared/model'
import {logoutThunk,} from '../../model/logout'
import {Link} from "react-router-dom";
import {RefreshToken} from "@/shared/model/types.ts";


export function LogoutButton(token: RefreshToken) {
  const dispatch = useAppDispatch()

  const onConfirmLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(logoutThunk(token)).unwrap()
  }

  return (
      <Link to="/" onClick={onConfirmLogout}>Выйти</Link>
  )
}