import { inject } from "@angular/core";
import { AuthService } from "./services/auth-service";


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


export function getPast12MonthsMap(): [Map<string, number>, Array<string>] {
  const result: string[] = [];
  const today = new Date();
  const map = new Map<string, number>();

  const start = new Date(today.getFullYear(), today.getMonth() - 11, 1);

  for (let i = 0; i < 12; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1); // go FORWARD
    const formatted = getMonthYear(d);
    result.push(formatted);
    map.set(formatted, 0);
  }

  return [map, result];
}

export function getMonthYear(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}


export function convertToMonthNames(arr: string[]): string[] {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return arr.map(item => {
    const monthIndex = Number(item.split("-")[1]) - 1; // 0-based
    return months[monthIndex];
  });
}


