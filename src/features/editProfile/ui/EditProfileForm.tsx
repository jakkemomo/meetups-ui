import { ReactElement, ReactNode } from "react";
import { EditProfileValidationSchema } from "../model/editProfileFormSchema";
import { useEditProfileMutation } from "@/entities/profile/api/profileApi";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared";
import { ProfileLoader } from "@/widgets/Profile/ProfileInfo";
import { prepareDataToRequest } from "../model/prepareDataToRequest";

interface IEditProfileFormProps {
  children: ReactNode;
  isLoading: boolean;
  isDataSuccess: boolean;
  userId: string;
}

export function EditProfileForm({
  children,
  isLoading,
  isDataSuccess,
  userId,
}: IEditProfileFormProps): ReactElement {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { dirtyFields }
  } = useFormContext<EditProfileValidationSchema>();

  const [editProfile, { isLoading: isEditProfileLoading }] =
    useEditProfileMutation();

  const onSubmit = (data: EditProfileValidationSchema) => {
    if (Object.keys(dirtyFields).length === 0) {
      navigate("/profile/me", { replace: true });
    } else {
      const dataToRequest = prepareDataToRequest({ data, dirtyFields: dirtyFields as Record<string, boolean | undefined> });

      editProfile({ userId, ...dataToRequest })
        .unwrap()
        .then(() => navigate("/profile/me", { replace: true }))
        .catch((err) => console.log(err));
    }
  };

  if (isLoading) return <ProfileLoader />;

  if (isDataSuccess) {
    return (
      <form
        onSubmit={(data) => void handleSubmit(onSubmit)(data)}
        noValidate
        className="flex flex-col scrollbar"
      >
        {children}
        <Button
          type="submit"
          size="lg"
          importance="primary"
          extraClass="self-start mt-10"
          disabled={isEditProfileLoading}
        >
          Сохранить
        </Button>
      </form>
    );
  }
  return <p>Ошибка сервера. Попробуйте перезагрузить страницу</p>;
}
