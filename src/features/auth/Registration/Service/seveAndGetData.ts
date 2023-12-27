import { FieldValues } from "react-hook-form"

const REGISTRATION_FORM_DATA_KEY = "registration-form-data"

export enum ValueTextField {
    EMAIL = "email",
    PASSWORD1 = "password",
    PASSWORD2 = "password",
    LOGIN = "login",
}

export const clearFormData = () => sessionStorage.removeItem(REGISTRATION_FORM_DATA_KEY)

export const setFormData = (formData : FieldValues) => sessionStorage.setItem(REGISTRATION_FORM_DATA_KEY, JSON.stringify(formData))

type ReturnType = {
    email? : ValueTextField.EMAIL,
    password? : ValueTextField.PASSWORD1,
    login? : ValueTextField.LOGIN
}

export const getFormData = () : ReturnType => {
    const rawFormData = sessionStorage.getItem(REGISTRATION_FORM_DATA_KEY);

    if (!rawFormData) {
        return {};
    }

    return JSON.parse(rawFormData);
}