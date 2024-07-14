import {Fragment, useEffect, useState} from 'react'
import { Listbox } from '@headlessui/react'
import { ISelectInputOptions } from '../../model/types';

interface ISelectInputProps {
  labelText?: string;
  placeholder?: string;
  isDisabled?: boolean;
  value?: ISelectInputOptions;
  onChange?: (option: ISelectInputOptions) => void;
  error?: string;
  extraErrorClass?: string;
  extraBoxClass?: string;
  extraContentClass?: string;
  extraDropdownClass?: string;
  options: ISelectInputOptions[];
}

export function SelectInput({
  options,
  labelText,
  placeholder,
  isDisabled,
  error,
  extraErrorClass,
  value,
  onChange,
  extraBoxClass,
  extraContentClass,
  extraDropdownClass
}: ISelectInputProps) {
  const [selectedOption, setSelectedOption] = useState<ISelectInputOptions | null>(null);

  useEffect(() => {
    if (!placeholder) {
      setSelectedOption(options[0]);

      onChange && onChange(options[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectOption = (option: ISelectInputOptions) => {
    setSelectedOption(option);

    onChange && onChange(option);
  }

  return (
    <div className={`w-[480px] flex flex-col items-start relative ${extraBoxClass}`}>
      <Listbox
        as={Fragment}
        value={value ?? selectedOption}
        onChange={onSelectOption}
        name="assignee"
      >
        {({open, value}) => (
          <>
            {labelText && (
              <Listbox.Label as='label' className={'text-xl text-text-black mb-[7px] cursor-pointer'}>
                {labelText}
              </Listbox.Label>
            )}
            <Listbox.Button
              className={`h-[44px] bg-custom-gray rounded-[10px] border-1 border-solid w-full flex justify-between items-center px-[22px] ${error ? "border-input-error" : "border-transparent"} ${extraContentClass}`}
              aria-disabled={isDisabled}
            >
              {(!value && placeholder) ? (
                <p className={'text-lg text-text-light-gray'}>{placeholder}</p>
                ) : (
                <p className={`text-lg ${isDisabled ? "text-white" : "text-text-black"}`}>{value?.name ?? selectedOption?.name}</p>
              )}
              <div
                className={`bg-center bg-no-repeat bg-cover w-6 h-6 ml-1 ${isDisabled ? "bg-chevron-down-white" : "bg-chevron-down-black"} ${open ? 'transition ease-in-out rotate-180 duration-100': 'transition ease-in-out rotate-0 duration-100'}`}
              ></div>
            </Listbox.Button>
              <Listbox.Options
                as='div'
                className={`flex flex-col bg-custom-gray rounded-[10px] w-[480px] max-h-[170px] pl-[22px] py-3 mt-1 absolute z-10 ${extraDropdownClass} ${placeholder ? 'top-[80px]' : 'top-11'} left-0 overflow-y-auto scrollbar`}
              >
                {options.map((option) => (
                  <Listbox.Option
                    as='div'
                    key={option.id}
                    value={option}
                    className={'cursor-pointer pt-2 first-of-type:pt-0'}
                  >
                    {option.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
          </>
        )}
      </Listbox>
      { error && <p className={`text-input-error leading-[20px] mt-[7px] ${extraErrorClass}`}>{error}</p>}
    </div>
  )
}
