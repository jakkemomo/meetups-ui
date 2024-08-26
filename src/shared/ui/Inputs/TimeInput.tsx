import { Time } from "@internationalized/date";
import { ReactElement } from "react";
import { DateInput, DateSegment, TimeField, TimeFieldProps, TimeValue } from "react-aria-components";

interface ITimeInputProps<T extends TimeValue> extends TimeFieldProps<T> {
  onStringChange: (value: string) => void;
  stringValue: string | null;
  extraFieldClass?: string;
  extraInputClass?: string;
  extraSegmentClass?: string;
  error?: string;
  isDisabled?: boolean;
  id?: string;
}

// This Input was created for custom control hourCycle of input type=time.
// It only accepts and returns time in 14:30 format.
// Due to the nature of the library, it is difficult to make it reusable.
// If you need an input that will return time in any format other than 14:30 - create a new component.
function TimeInput<T extends TimeValue>(
  { onStringChange, stringValue, extraFieldClass, extraInputClass, extraSegmentClass, error, isDisabled, id }: ITimeInputProps<T>
): ReactElement {

  return (
    <TimeField
      value={stringValue ? new Time(Number(stringValue?.slice(0, 2)), Number(stringValue?.slice(3, 5))) : null}
      onChange={(time) => {
        if (!time) return onStringChange('');

        const newTime = time.toString().slice(0, 5);

        onStringChange(newTime);
      }}
      shouldForceLeadingZeros={true}
      hourCycle={24}
      aria-labelledby={id}
      className={`bg-secondary-100 rounded-[10px] ${extraFieldClass} ${error ? "border-system-500 border-1 border-solid" : ""}`}
      isInvalid={error ? true : false}
      id={id}
      isDisabled={isDisabled}
    >
      <DateInput className={`flex ${extraInputClass}`}>
        {(segment) => <DateSegment className={`outline-none focus:bg-cyan-300 rounded ${extraSegmentClass}`} segment={segment} />}
      </DateInput>
    </TimeField>
  )
}

export default TimeInput;
