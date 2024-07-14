export const defaultProfileFormValues = {
  username: "",
  gender: "",
  date_of_birth: "",
  city: "",
  bio: "",
  is_private: false,
  category_favorite: [],
};

export const editProfileAvatarClass =
  "cursor-pointer before:bg-edit-photo before:bg-no-repeat before:bg-center before:absolute before:inset-0 before:bg-edit-profile-shadow before:rounded-circle before:opacity-0 before:hoverscreen:hover:opacity-100 before:z-50 before:duration-150";

export const privateOptionText =
  "Если у Вас приватный профиль, люди не смогут видеть ваши созданные, запланированные и посещенные мероприятия без подписки на Вас";

export const inputExistErrorMessage = "Обязательное поле";

export const inputMaxSize = (max: number) =>
  `Максимальная длина - ${max} символов`;
