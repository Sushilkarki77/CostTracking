import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { initializerFunction } from './common/app.utils';
import { provideEffects } from '@ngrx/effects';
import { appStoreProviders } from './store/app.store';
import { authInterceptor } from './common/interceptors/auth-interceptor';
import { retryInterceptor } from './common/interceptors/retry-interceptor-interceptor';
import { authErrorInterceptor } from './common/interceptors/auth-error-interceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, retryInterceptor, authErrorInterceptor])),
    provideAppInitializer(initializerFunction),
    appStoreProviders,
  ]
};
