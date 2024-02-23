import {ReactElement} from "react";
import {Button, Input, SelectInput, LargeTextInput} from "@/shared";

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
]

export default function AddEventForm(): ReactElement {

  return (
    <form noValidate className="flex flex-col gap-[30px] ">
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
      />
      
      <LargeTextInput
        labelText='Описание'
        placeholder='Расскажите подробнее'
        extraBoxClass={'mt-[7px]'}
      />

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
        labelText='Адрес'
        placeholder='Введите адрес'
        id='add-event-address'
      />
      <div className='flex'>
        <Input
          HTMLType='number'
          labelText='Количество людей'
          placeholder='Введите число'
          id='add-event-people-number'
        />

        <Input
          HTMLType='text'
          labelText='Тип'
          placeholder='Выберите'
          id='add-event-type'
        />
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
