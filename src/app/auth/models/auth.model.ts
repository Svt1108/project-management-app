export interface RegisterRequestModel {
  name: string;
  login: string;
  password: string;
}

export interface LoginRequestModel {
  login: string;
  password: string;
}

export interface UserModel {
  id: string;
  login: string;
  password: string;
}

export interface TokenResponseModel {
  token: string;
}
