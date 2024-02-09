export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IRegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export enum ValueTextField {
  USERNAME = "username",
  EMAIL = "email",
  PASSWORD = "password",
}

export interface ISelectorOptions {
  value: string;
  name: string;
}

export interface ISlickSliderSettings {
  infinite?: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
}

export interface ICardProps {
  date: string | number;
  weekDay: string;
}
