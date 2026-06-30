import { api } from '@/lib/axios';
import { AuthResponse } from '../types';
import { LoginFormFields } from '../schemas/auth-schema';

export const authService = {
  login: async (credentials: LoginFormFields): Promise<AuthResponse> => {
    return api.post('/auth/login', credentials);
  },

  logout: async () => {
    return api.post('/auth/logout');
  }
};
