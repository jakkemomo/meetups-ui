import {useCallback} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {FieldValues} from "react-hook-form";
import {setFormValuesInStorage} from "@/shared/lib/saveAndGetFormValues";

export const useChangeStep = (formKey: string, path: string,  activeStep: number) => {
  const navigation = useNavigate();
  const location = useLocation();

  return useCallback(
    (data?: FieldValues) => {
      if (data) {
        setFormValuesInStorage(formKey, data);
      }
      navigation(path, { ...location, state: { activeStep } });
    },
    [navigation, location, activeStep]
  );
}

