export interface SessionDto {
  access: string,
  refresh: string
}

export interface RequestLoginBody {
  email: string;
  password: string;
}

export interface RequestRegistrationBody {
  username: string;
  email: string;
  password: string;
}
