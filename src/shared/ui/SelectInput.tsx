import {Fragment, useEffect, useState} from 'react'
import { Listbox } from '@headlessui/react'

interface ISelectInputProps {
  labelText?: string,
  placeholder?: string,
  extraBoxClass?: string,
  extraContentClass?: stirng,
  options: any[]
}

export function SelectInput({options, labelText, placeholder, extraBoxClass, extraContentClass}: ISelectInputProps) {
  const [selectedOption, setSelectedOption] = useState("")

  useEffect(() => {
    if (!placeholder) {
      setSelectedOption(options[0]);
    }
  }, []);

  return (
    <div className={`w-[480px] flex flex-col items-start relative ${extraBoxClass}`}>
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
              className={`h-[44px] bg-custom-gray rounded-[10px] border w-full border-transparent flex justify-between items-center px-[22px] ${extraContentClass}`}
            >
              {(!value && placeholder) ? (
                <p className={'text-lg text-text-light-gray'}>{placeholder}</p>
                ) : (
                <p className={'text-lg text-text-black'}>{selectedOption.name}</p>
              )}
              <div
                className={`bg-center bg-no-repeat bg-cover w-6 h-6 ml-1 ${open ? 'transition ease-in-out rotate-180 duration-100': 'transition ease-in-out rotate-0 duration-100'}`}
                style={{ backgroundImage: `url("/images/dropdown-icon.svg")` }}
              ></div>
            </Listbox.Button>
              <Listbox.Options
                as='div'
                className={`flex flex-col bg-custom-gray rounded-[10px] w-[480px] max-h-[170px] pl-[22px] py-3 mt-1 absolute z-10 ${placeholder ? 'top-[80px]' : 'top-11'} left-0 overflow-y-auto scrollbar`}
              >
                {options.map((option) => (
                  <Listbox.Option
                    as='div'
                    key={option.id}
                    value={option}
                    className={'cursor-pointer py-[4px]'}
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
