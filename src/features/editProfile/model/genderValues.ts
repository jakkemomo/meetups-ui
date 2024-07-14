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
