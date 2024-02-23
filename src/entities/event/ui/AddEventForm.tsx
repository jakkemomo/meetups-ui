import {ReactElement} from "react";
import {Button, Input} from "@/shared";

export default function AddEventForm(): ReactElement {

  return (
    <form noValidate className="flex flex-col gap-[30px] ">
      <Input
        HTMLType='text'
        labelText='Название'
        placeholder='Введите название'
        id='add-event-name'
      />

      <Input
        HTMLType='text'
        labelText='Категория'
        placeholder='Выберите'
        id='add-event-category'
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

      <Input
        HTMLType='text'
        labelText='Галерея фото (необязательно)'
        placeholder='Загрузите дополнительные фото'
        id='add-event-photos'
      />

      <Input
        HTMLType='text'
        labelText='Описание'
        placeholder='Расскажите подробнее'
        id='add-event-description'
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

      <Button type={'primary'} HTMLType={'submit'}>Создать</Button>
    </form>
  )
}
