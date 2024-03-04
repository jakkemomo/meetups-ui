import { useState } from 'react'
import { Switch } from '@headlessui/react'

interface ISwitchInputProps {
  labelText?: string;
  extraBoxClass?: string;
}
export function SwitchInput({labelText, extraBoxClass}: ISwitchInputProps) {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch.Group>
      <div className={`flex items-center ${extraBoxClass}`}>
        {labelText && (
          <Switch.Label className={`text-lg text-text-black mr-3.5 cursor-pointer`}>{labelText}</Switch.Label>
        )}
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-main-blue' : 'bg-custom-gray'
          } relative inline-flex h-[30px] w-[60px] items-center rounded-full transition-colors `}
        >
          <span
            className={`${
              enabled ? 'translate-x-8 bg-white' : 'translate-x-1 bg-toggle-color'
            } inline-block h-[22px] w-[22px] transform rounded-full  transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}
