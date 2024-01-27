import { ReactElement } from "react";

export function CheckEmail(): ReactElement {
    return (
      <>
        <p className='text-neutral-500 text-lg'>Вам на почту было выслано письмо</p>
        <p className='mt-5 text-neutral-500 text-lg'>Для подтверждения личности перейдите по ссылке в письме</p>
      </>
    )
  }
