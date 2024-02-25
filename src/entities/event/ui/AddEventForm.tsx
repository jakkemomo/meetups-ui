import {ReactElement} from "react";
import {Button, Input, SelectInput, LargeTextInput} from "@/shared";

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
  { id: 6, name: 'Durward Reynolds', unavailable: false },
  { id: 7, name: 'Kenton Towne', unavailable: false },
  { id: 8, name: 'Therese Wunsch', unavailable: false },
  { id: 9, name: 'Benedict Kessler', unavailable: true },
  { id: 10, name: 'Katelyn Rohan', unavailable: false },
]

const typeOfEvent = [
  { id: 1, name: 'Публичное', unavailable: false },
  { id: 2, name: 'По ссылке', unavailable: false },
]

const currency = [
  { id: 1, name: 'BYN', unavailable: false },
  { id: 2, name: 'USD', unavailable: false },
  { id: 3, name: 'RUB', unavailable: false },
]

export default function AddEventForm(): ReactElement {

  return (
    <form noValidate className="flex flex-col gap-[30px] scrollbar">
      <Input
        HTMLType='text'
        labelText='Название'
        placeholder='Введите название'
        id='add-event-name'
        extraBoxClass={'w-[480px] md:w-[480px] mt-[7px]'}
        extraContentClass={'h-[44px]'}
      />

      <SelectInput
        labelText='Категория'
        options={people}
        placeholder='Выберите категорию'
      />

      <LargeTextInput
        labelText='Описание'
        placeholder='Расскажите подробнее'
        extraBoxClass={'mt-[7px]'}
      />

      <Input
        HTMLType='number'
        labelText='Количество мест'
        placeholder='25'
        id='add-event-people-number'
        inlineLabel={true}
        extraBoxClass={'w-[70px] md:w-[70px]  mt-[7px]'}
        extraContentClass={'h-[44px]'}
      />

      <div className={`flex items-center`}>
        <Input
          HTMLType='number'
          labelText='Возраст участников'
          placeholder='18'
          id='add-event-people-age'
          inlineLabel={true}
          extraBoxClass={'w-[70px] md:w-[70px]  mt-[7px]'}
          extraContentClass={'h-[44px]'}
        />
        <p className={`text-xl text-text-black font-medium ml-1.5`}>+</p>
      </div>

      <SelectInput
        labelText='Доступ к мероприятию'
        options={typeOfEvent}
        placeholder='Публичное/по ссылке'
      />

      <div className={'flex items-center'}>
        <Input
          HTMLType='number'
          labelText='Стоимость'
          placeholder='12'
          id='add-event-price'
          inlineLabel={true}
          extraBoxClass={'w-[92px] md:w-[92px] mr-1.5'}
          extraContentClass={'h-[44px]'}
        />
        <SelectInput
          extraBoxClass={'w-[90px] my-auto'}
          extraContentClass={'pl-[14px] pr-[10px]'}
          options={currency}
        />
      </div>


      <div className='flex'>
        <Input
          HTMLType='date'
          labelText='Дата'
          placeholder='Начало'
          id='add-event-start-date'
        />
        <div className='self-end'>
          <Input
            HTMLType='date'
            labelText='Дата'
            placeholder='Конец'
            id='add-event-end-date'
          />
          <p className='text-text-light-gray mt-2'>Необязательное поле</p>
        </div>
      </div>

      <Input
        HTMLType='text'
        labelText='Галерея фото (необязательно)'
        placeholder='Загрузите дополнительные фото'
        id='add-event-photos'
      />

      <div>
        <Input
          HTMLType='text'
          iconType='search-icon-gray'
          labelText='Тэги (необязательно)'
          placeholder='Ищите теги'
          id='add-event-name'
        />
        <p className='text-text-light-gray mt-2'>Тезисно опишите свое мероприятие</p>
      </div>

      <Button type={'primary'} HTMLType={'submit'}>Создать</Button>
    </form>
  )
}
