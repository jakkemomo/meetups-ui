import { AddEventForm } from "@/features/addEvent";
import { AddEventPageTitle } from "@/widgets/AddEventPageTitle";
import {ReactElement} from "react";
import {Input, SelectInput, LargeTextInput, SwitchInput, CheckboxWithValue, FileInputWithDrag} from "@/shared";
import { MapWidget } from "@/widgets/mapWidget";
import { PeriodicControl } from "@/features/periodicControl";
import { AccessControl } from "@/features/addEventAccessControl";

// mock data for testing
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

const currency = [
  { id: 1, name: 'BYN', unavailable: false },
  { id: 2, name: 'USD', unavailable: false },
  { id: 3, name: 'RUB', unavailable: false },
]

function AddEventPage(): ReactElement {
  return (
    <main className="w-full max-w-[1005px] mx-auto pb-[98px]">
      <AddEventPageTitle />
      <AddEventForm>
        <div className="flex items-end mt-[40px]">
          <div className="flex flex-col mr-[45px]">
            <Input
              HTMLType='text'
              labelText='Название'
              placeholder='Введите название'
              id='add-event-name'
              extraBoxClass={'w-[480px] md:w-[480px] mt-[7px]'}
              extraContentClass={'h-[44px]'}
              extraInputClass={'px-[22px]'}
            />

            <SelectInput
              labelText='Категория'
              options={people}
              placeholder='Выберите категорию'
              extraBoxClass="mt-[18px]"
            />
          </div>
          <FileInputWithDrag />
        </div>

        <LargeTextInput
          labelText='Описание'
          placeholder='Расскажите подробнее'
          extraBoxClass={'mt-[18px]'}
        />

        <div className='flex items-center relative mt-[18px]'>
          <Input
            HTMLType='date'
            labelText='Дата'
            placeholder='Начало'
            id='add-event-start-date'
            extraBoxClass={'w-[480px] md:w-[480px] mt-[7px]'}
            extraContentClass={'h-[44px]'}
            extraInputClass='px-[22px]'
          />
          <div
            className='w-4 h-0.5 mx-3.5 mt-8'
            style={{ backgroundImage: `url("/images/line-icon.svg")` }}
          />
          <div className='self-end relative'>
            <Input
              HTMLType='date'
              placeholder='Конец'
              id='add-event-end-date'
              extraBoxClass={'w-[480px] md:w-[480px] mt-[7px]'}
              extraContentClass={'h-[44px]'}
              extraInputClass='px-[22px]'
            />
            <p className='text-text-light-gray mt-2 absolute bottom-[-26px] left-0'>Необязательное поле</p>
          </div>
        </div>

        <div className='flex items-center relative mt-[20px]'>
          <Input
            HTMLType='time'
            labelText='Время'
            placeholder='Начало'
            id='add-event-start-time'
            extraBoxClass={'w-[480px] md:w-[480px] mt-[7px]'}
            extraContentClass={'h-[44px]'}
            extraInputClass='px-[22px]'
          />
          <div
            className='w-4 h-0.5 mx-3.5 mt-8'
            style={{ backgroundImage: `url("/images/line-icon.svg")` }}
          />
          <div className='self-end relative'>
            <Input
              HTMLType='time'
              placeholder='Конец'
              id='add-event-end-time'
              extraBoxClass={'w-[480px] md:w-[480px] mt-[7px] px-[22px]'}
              extraContentClass={'h-[44px]'}
            />
            <p className='text-text-light-gray mt-2 absolute bottom-[-26px] left-0'>Необязательное поле</p>
          </div>
        </div>

        <div className="mt-[30px] mb-[18px] text-text-black">
          <PeriodicControl />
        </div>

        <MapWidget text="Точка на карте" position={{ lat: 53.9, lng: 27.56667 }} zoom={14} markers={[]} withAddressControl={true} />

        <div className={'flex items-center mt-[18px]'}>
          <Input
            HTMLType='number'
            labelText='Количество мест'
            placeholder='25'
            id='add-event-people-number'
            inlineLabel={true}
            extraBoxClass={'w-[72px] md:w-[72px] mt-[7px]'}
            extraContentClass={'h-[44px]'}
            extraInputClass="px-[24px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <SwitchInput
            labelText={'Места не ограничены'}
            extraBoxClass={'ml-[60px]'}
          />
          <CheckboxWithValue
            id="chat"
            value="Добавить чат участников"
            extraBoxClass="ml-auto"
            extraLabelClass="ml-2.5"
          />
        </div>

        <div className={`flex items-center mt-[18px]`}>
          <Input
            HTMLType='number'
            labelText='Возраст участников'
            placeholder='18'
            id='add-event-people-age'
            inlineLabel={true}
            extraBoxClass={'w-[62px] md:w-[62px] mt-[7px]'}
            extraContentClass={'h-[44px]'}
            extraInputClass="px-[19px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <p className={`text-xl text-text-black font-medium ml-1.5`}>+</p>
        </div>

        <AccessControl />

        <div className={'flex items-center mt-[18px]'}>
          <Input
            HTMLType='number'
            labelText='Стоимость'
            placeholder='12'
            id='add-event-price'
            inlineLabel={true}
            extraBoxClass={'w-[92px] md:w-[92px] mr-1.5'}
            extraContentClass={'h-[44px]'}
            extraInputClass="px-[34px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <SelectInput
            extraBoxClass={'w-[90px] my-auto'}
            extraContentClass={'pl-[14px] pr-[10px]'}
            extraDropdownClass={'w-[90px]'}
            options={currency}
          />
          <SwitchInput
            labelText={'Бесплатное'}
            extraBoxClass={'ml-[60px]'}
          />
        </div>

        <div className="mt-[18px]">
          <Input
            HTMLType='text'
            iconType='add-media-icon'
            labelText='Галерея фото и видео (необязательно)'
            placeholder='Загрузите дополнительные материалы'
            id='add-event-photos'
            extraBoxClass="mt-[7px]"
            extraContentClass="ml-[22px]"
            extraInputClass="ml-3"
          />
        </div>

        <div className="mt-[18px]">
          <Input
            HTMLType='text'
            iconType='search-icon-gray'
            labelText='Тэги (необязательно)'
            placeholder='Ищите теги'
            id='add-event-name'
            extraBoxClass="px-[22px] mt-[7px]"
            extraInputClass="pl-3"
          />
          <p className='text-text-light-gray mt-2'>Тезисно опишите свое мероприятие</p>
        </div>
      </AddEventForm>
    </main>
  );
}

export default AddEventPage;
