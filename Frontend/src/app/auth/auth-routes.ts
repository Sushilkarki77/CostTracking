import { Route } from "@angular/router";
import { Login } from "./login/login";
import { Register } from "./register/register";

export const authRoutes: Route[] = [
  { path: 'login', loadComponent: () => import('./login/login').then(x => x.Login) },
  { path: 'register', loadComponent: () => import('./register/register').then(x => x.Register) }
]
