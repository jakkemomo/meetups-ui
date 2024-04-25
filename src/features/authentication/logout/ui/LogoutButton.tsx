import { RefreshToken } from "@/shared/model/types.ts";
import { useLogoutMutation } from "@/entities/session/api/sessionApi.ts";
import React from "react";
import { useNavigate } from "react-router-dom";
import Svg from "@/shared/ui/Svg";

export function LogoutButton(token: RefreshToken) {
  const [logoutTrigger] = useLogoutMutation();
  const navigate = useNavigate();

  const onConfirmLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    logoutTrigger(token)
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => {
        throw new Error(error.data.details);
      });
  };
  return (
    <div
      className="flex cursor-pointer w-[100%] hover:bg-slate-50"
      onClick={onConfirmLogout}
    >
      <div className="w-6 h-6 p-[2.40px] mr-[14px] justify-center items-center inline-flex">
        <Svg
          id="bm-logout"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        />
      </div>
      <p className="text-zinc-600 text-[17px] font-['Mulish']">
        Выйти из профиля
      </p>
    </div>
  );
}
