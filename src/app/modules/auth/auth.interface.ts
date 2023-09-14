import { ENUM_USER_ROLE } from "../../../enums/user";

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  token: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  token: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_ROLE;
};
