import {ReactElement} from "react";

export function CheckEmail(): ReactElement {
    return (
      <div className="flex flex-col mt-[26px] md:mt-10 md:px-90">
        <p className='text-neutral-500 text-base md:text-lg text-center md:text-left'>Вам на почту было выслано письмо</p>
        <p className='mt-5 text-neutral-500 text-base md:text-lg text-center md:text-left'>Для подтверждения личности перейдите по ссылке в письме</p>
      </div>
    )
  }
