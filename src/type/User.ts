export type User = {
  name?: string;
  email: string;
  createdAt?: string;
  password?: string;
};

export type SignInUser = {
  email: string;
  password: string;
};

export type SignUpUser = {
  email: string;
  password: string;
  username?: string;
};
