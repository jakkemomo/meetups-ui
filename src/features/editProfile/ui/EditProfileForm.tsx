import { ReactElement, ReactNode } from "react";
import { EditProfileValidationSchema } from "../model/editProfileFormSchema";
import { useEditProfileMutation } from "@/entities/profile/api/profileApi";
import { UseFormHandleSubmit } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared";
import { ProfileLoader } from "@/widgets/Profile/ProfileInfo";

interface IEditProfileFormProps {
  children: ReactNode;
  handleSubmit: UseFormHandleSubmit<EditProfileValidationSchema>;
  isLoading: boolean;
  isDataSuccess: boolean;
  userId: string;
}

export function EditProfileForm({
  children,
  handleSubmit,
  isLoading,
  isDataSuccess,
  userId,
}: IEditProfileFormProps): ReactElement {
  const navigate = useNavigate();
  const [editProfile, { isLoading: isEditProfileLoading }] =
    useEditProfileMutation();

  const onSubmit = (data: EditProfileValidationSchema) => {
    editProfile({ userId, ...data })
      .unwrap()
      .then(() => navigate("/profile/me", { replace: true }))
      .catch((err) => console.log(err));
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
