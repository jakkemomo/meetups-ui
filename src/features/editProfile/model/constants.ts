export const defaultProfileFormValues = {
  username: "",
  gender: "",
  date_of_birth: "",
  city: "",
  city_location: {
    place_id: undefined,
    north_east_point: undefined,
    south_west_point: undefined,
    location: undefined
  },
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

export const genderOption = [
  { id: 0, name: "Мужской" },
  { id: 1, name: "Женский" },
  { id: 3, name: "Не выбрано" },
];
export const getGenderValue = (value: string) => {
  switch (value) {
    case "NONE":
      return genderOption[2];
    case "MALE":
      return genderOption[0];
    case "FEMALE":
      return genderOption[1];
    default:
      return undefined;
  }
};

export const setGenderValue = (name: string) => {
  switch (name) {
    case "Не выбрано":
      return "NONE";
    case "Мужской":
      return "MALE";
    case "Женский":
      return "FEMALE";
    default:
      return undefined;
  }
};
