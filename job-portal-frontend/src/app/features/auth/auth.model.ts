export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  roles: string[];
}

export interface LoginResponse {
  token: string;

}