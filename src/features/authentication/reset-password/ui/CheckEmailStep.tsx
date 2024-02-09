import {ReactElement } from "react";
import {FormWrapper} from "@/shared/ui";


export function CheckEmailStep(): ReactElement {

  return (
    <FormWrapper redirectType='register' headerText='Проверьте вашу почту' >
      <div className="flex flex-col mt-[26px] md:mt-[43px]">
        <p className='text-neutral-500 text-base md:text-lg font-normal w-80 mb-6 text-center md:text-left'>Вам на почту было выслано письмо</p>
        <p className='text-neutral-500 text-base md:text-lg font-normal w-80 text-center md:text-left'>Для ввода нового пароля перейдите по ссылке в письме</p>
      </div>
    </FormWrapper>
  )
}
