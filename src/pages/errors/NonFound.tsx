import {FC} from "react";
import {useNavigate} from 'react-router-dom';

const NonFound: FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  }

  return (
    <section className='flex flex-col gap-20 m-auto'>
      <p className='text-9xl m-auto pb-20'>Error 404 :(</p>
      <p className='text-4xl m-auto'>Страница не найдена</p>
      <p className='text-2xl m-auto'>Страница, которую вы запрашиваете, не существует или была изменена</p>
      <button
        className='text-2xl bg-neutral-50 w-80 m-auto py-4 rounded-lg text-neutral-900 hover:opacity-80'
        onClick={onClick}
      >
        &#706;&nbsp;&nbsp;&nbsp;&nbsp;Вернуться назад
      </button>
    </section>
  )
}

export default NonFound
