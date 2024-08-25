import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'

interface ISwitchInputProps {
  labelText?: string;
  extraBoxClass?: string;
  onChange: (state: boolean) => void;
  value: boolean;
}

export function SwitchInput({ labelText, extraBoxClass, onChange, value }: ISwitchInputProps) {
  const [enabled, setEnabled] = useState(value || false);

  useEffect(() => {
    setEnabled(value);
  }, [value]);

  const onSwitch = (state: boolean) => {
    setEnabled(state);

    onChange && onChange(state);
  }

  return (
    <Switch.Group>
      <div className={`flex items-center ${extraBoxClass}`}>
        {labelText && (
          <Switch.Label className={`text-lg text-text-black mr-3.5 cursor-pointer`}>{labelText}</Switch.Label>
        )}
        <Switch
          checked={enabled}
          onChange={onSwitch}
          className={`${
            enabled ? 'bg-main-violet-600' : 'bg-secondary-100'
          } relative inline-flex h-[30px] w-[60px] items-center rounded-full transition-colors `}
        >
          <span
            className={`${
              enabled ? 'translate-x-8 bg-white' : 'translate-x-1 bg-secondary-400'
            } inline-block h-[22px] w-[22px] transform rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}
