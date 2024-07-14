import { ParticipantsAgeControl } from "@/features/addEvent/participantsAgeControl";
import { PlacesNumberControl } from "@/features/addEvent/placesNumberControl";
import { PriceControl } from "@/features/addEvent/priceControl";
import { CheckboxWithLabel } from "@/shared";
import { ISelectInputOptions } from "@/shared/model/types";
import { ReactElement } from "react";

interface IParticipantsControlProps {
  currencies: ISelectInputOptions[];
}

export function ParticipantsControl({ currencies }: IParticipantsControlProps): ReactElement {
  return (
    <>
      <div className="flex items-center mt-[18px]">
        <PlacesNumberControl />
        <CheckboxWithLabel
          id="chat"
          label="Добавить чат участников"
          extraBoxClass="ml-auto"
          extraLabelClass="ml-2.5"
        />
      </div>

      <ParticipantsAgeControl />

      <PriceControl
        currencies={currencies}
      />
    </>
  )
}
