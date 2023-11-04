export type LoginFormValues = {
  username: string;
  password: string;
};

export type SignUpFormValues = LoginFormValues & {
  email: string;
  name: string;
  confirmPassword: string;
};
