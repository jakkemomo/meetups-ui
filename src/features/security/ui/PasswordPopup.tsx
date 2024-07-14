import { Button } from "@/shared";
import { useAppDispatch } from "@/shared/model";
import { ReactElement } from "react";
import Svg from "@/shared/ui/Svg";
import { securityPopupSetted } from "../model/securityPopupSlice";

function PasswordPopup(): ReactElement {
  const dispatch = useAppDispatch();

  return (
    <div className="absolute flex flex-col items-center top-[241px] left-1/2 translate-x-[-50%] bg-white min-w-[584px] rounded-def pt-[62px] pb-[70px]">
      <Svg
        onClick={() => dispatch(securityPopupSetted({ isOpen: false }))}
        id="close-cross"
        className="absolute top-[42px] right-[45px] w-6 h-6 cursor-pointer duration-150 hoverscreen:hover:opacity-70"
      />
      <Svg
        id="password-lock-icon"
        className="w-[64px] h-[64px]"
        extraUseClass="!stroke-but-primary"
        viewBox="0 0 24 24"
      />
      <h2 className="text-[30px] font-semibold text-center leading-[38px] mt-[30px]">Ваш пароль <br /><span className="text-but-primary">обновлен</span></h2>
      <Button
        onClick={() => dispatch(securityPopupSetted({ isOpen: false }))}
        size="md"
        importance="primary"
        extraClass="mt-8"
      >Ок</Button>
    </div>
  )
}

export default PasswordPopup;
