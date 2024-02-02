import {UseFormSetValue} from "react-hook-form";
import {useEffect} from "react";
import {
  getFormValuesFromStorage,
} from "@/shared/lib/saveAndGetFormValues";
import {ValueTextField} from "@/shared/types";

type Prop = (formKey: string, setValue: UseFormSetValue<any>, fieldArray: ValueTextField[]) => void

export const useFilledValue: Prop = (formKey, setValue, fieldArray) => {
  const dataInSessionStore = getFormValuesFromStorage(formKey);

  useEffect(() => {
    if (!dataInSessionStore) return;
    fieldArray.forEach(key => {
      setValue(key, dataInSessionStore[key])
    })
  },[])

}
