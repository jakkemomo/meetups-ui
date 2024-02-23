import {Fragment, useState} from 'react'
import { Listbox } from '@headlessui/react'

interface ISelectInputProps {
  labelText?: string,
  options: any[]
}

export default function SelectInput({labelText, options}: ISelectInputProps) {
  const [selectedOption, setSelectedOption] = useState("")

  return (
    <div className='w=[480px] flex flex-col items-start '>
      <Listbox
        as={Fragment}
        value={selectedOption}
        onChange={setSelectedOption}
        name="assignee"
      >
        {({open, value}) => (
          <>
            {labelText && (
              <Listbox.Label className={'text-xl text-text-black mb-[7px]'}>
                {labelText}
              </Listbox.Label>
            )}
            <Listbox.Button
              className='h-[44px] bg-custom-gray rounded-[10px] border w-[480px] border-transparent flex justify-between items-center pl-[26px] pr-[10px]'
            >
              {!value ? (
                <p className={'text-lg text-text-light-gray'}>Выберите категорию</p>
                ) : (
                <p className={'text-lg text-text-black'}>{selectedOption.name}</p>
              )}
              <div
                className={`bg-center bg-no-repeat bg-cover w-6 h-6 ${open ? 'transition ease-in-out rotate-180 duration-100': 'transition ease-in-out rotate-0 duration-100'}`}
                style={{ backgroundImage: `url("/images/dropdown-icon.svg")` }}
              ></div>
            </Listbox.Button>
            <Listbox.Options>
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  value={option}
                  className={'cursor-pointer'}
                >
                  {option.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>

  )
}
