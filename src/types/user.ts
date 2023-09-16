export type UserDataProps = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profileImageUrl?: string;
};

export type UserObj = {
  user: UserDataProps | undefined;
  message: string;
};

export type singInProp = {
  email: string;
  password: string;
};
