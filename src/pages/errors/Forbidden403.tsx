import {FC} from "react";
import {useNavigate} from 'react-router-dom';

const Forbidden403: FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/');
  }

  return (
    <section className='flex flex-col gap-20 m-auto'>
      <p className='text-9xl m-auto pb-20'>Error 403</p>
      <p className='text-4xl m-auto'>Доступ запрещен</p>
      <p className='text-2xl m-auto'>У вас недостаточно прав для доступа к этой странице</p>
      <button
        className='text-2xl bg-neutral-50 w-80 m-auto py-4 rounded-lg text-neutral-900 hover:opacity-80'
        onClick={onClick}
      >
        На главную
      </button>
    </section>
  )
}

export default Forbidden403
