import { Button } from "@/shared";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import Svg from "@/shared/ui/Svg";
import { ReactElement } from "react";
import { securityPopupSetted } from "../model/securityPopupSlice";

function EmailSendedPopup(): ReactElement {
  const dispatch = useAppDispatch();
  const { newEmail } = useAppSelector((state) => state.securityPopup);

  return (
    <div className="absolute flex flex-col items-center top-[157px] left-1/2 translate-x-[-50%] bg-white min-w-[584px] rounded-def px-10 pt-[62px] pb-[30px]">
      <Svg
        onClick={() => dispatch(securityPopupSetted({ isOpen: false }))}
        id="close-cross"
        className="absolute top-[42px] right-[45px] w-6 h-6 cursor-pointer duration-150 hoverscreen:hover:opacity-70"
      />
      <Svg id="email-sended-icon" className="w-[64px] h-[64px]" />
      <h2 className="text-[30px] font-semibold text-text-black leading-[44px] text-center mt-3.5">Вам пришло сообщение на почту<br />
        <span className="text-but-primary">{newEmail}</span>
      </h2>
      <p className="text-[18px] text-center mt-[30px]">Перейдите по ссылке в сообщении, <br />чтобы подтвердить почту</p>
      <Button
        onClick={() => dispatch(securityPopupSetted({ isOpen: false }))}
        type="button"
        extraClass="text-[18px] mt-[30px]"
        size="md"
        importance="primary"
      >ОК</Button>
      <p className="text-[18px] mt-[90px]">Не пришло сообщение?</p>
      <Button
        type="button"
        extraClass="text-[18px] font-light text-but-primary mt-0.5 duration-150 hoverscreen:hover:opacity-70"
      >Прислать повторно</Button>
    </div>
  )
}

export default EmailSendedPopup;
