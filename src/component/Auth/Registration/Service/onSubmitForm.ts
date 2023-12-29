import {useCallback} from "react"
import {useLocation, useNavigate} from "react-router-dom"
import {setFormData} from "./seveAndGetData"
import {FieldValues} from "react-hook-form"

const useOnSubmitForm = (activeStep: number) => {
    const navigation = useNavigate()
    const location = useLocation()

    return useCallback(
        (data : FieldValues) => {
            setFormData(data);
            navigation("/registration", { ...location, state: { activeStep } });
        },
        [navigation, location, activeStep]
    );
}

export default useOnSubmitForm
