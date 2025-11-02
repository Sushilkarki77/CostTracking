import { inject } from "@angular/core";
import { AuthService } from "../auth/auth-service";


export const verifyToken = (token: string): boolean => {
  try {
    if (!token) return false;
    const payload: { exp: number } = JSON.parse(atob(token.split('.')[1]));
    const expiry: number = payload.exp * 1000;
    return Date.now() < expiry;
  } catch (error: unknown) {
    console.error(error);
    return false;
  }
};


export const initializerFunction = () => {
  const authService = inject(AuthService);
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken || !accessToken || !verifyToken(refreshToken)) {
    authService.logout();
    return;
  }

  authService.setTokens(accessToken, refreshToken)
}