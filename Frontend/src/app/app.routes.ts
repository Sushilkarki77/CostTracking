import { Routes } from '@angular/router';
import { isLoggedInGuard } from './auth/guards/is-logged-in-guard';
import { isLoggedOutGuard } from './auth/guards/is-logged-out-guard';

export const routes: Routes = [
    { path: 'auth', canActivate: [isLoggedOutGuard], loadChildren: () => import('./auth/auth-routes').then(r => r.authRoutes) },
    { path: 'dashboard', canActivate: [isLoggedInGuard], loadChildren: () => import('./dashboard/dashboard-routes').then(r => r.dashboardRoutes) },
    { path: '**', redirectTo: 'dashboard' }
];
