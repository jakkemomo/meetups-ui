import {FieldValues} from "react-hook-form"
import {ValueTextField} from "@/shared/types";

export const clearFormValuesInStorage = (formKey: string) => sessionStorage.removeItem(formKey)
export const setFormValuesInStorage = (formKey: string, formData: FieldValues) => sessionStorage.setItem(formKey, JSON.stringify(formData))

interface ReturnType {
  username?: ValueTextField.USERNAME;
  email?: ValueTextField.EMAIL;
  password?: ValueTextField.PASSWORD;
}

export const getFormValuesFromStorage = (formKey: string): ReturnType => {
  const rawFormData = sessionStorage.getItem(formKey);
  if (!rawFormData) {
    return {};
  }
  return JSON.parse(rawFormData);
}
