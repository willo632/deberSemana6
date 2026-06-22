export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  mensaje: string;
  usuario: string;
  nombre: string;
}

export interface AuthSession {
  username: string;
  nombre: string;
  loginTime: string;
}

export interface ValidateResponse {
  valido: boolean;
  usuario: string;
}
