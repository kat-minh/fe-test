export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'employee';
}

export interface AuthResponse {
  token: string;
  user: User;
}
