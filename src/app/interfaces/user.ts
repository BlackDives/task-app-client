export interface User {
  username: string;
  email: string;
  token: string;
}

export interface NewUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface JwtPayload {
  email: string;
  given_name: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}
