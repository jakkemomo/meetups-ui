
export interface RequestLoginBody {
  email: string;
  password: string;
}

export interface RequestRegistrationBody {
  username: string;
  email: string;
  password: string;
}

export interface RequestEmailCheckBody {
  email: string;
}
