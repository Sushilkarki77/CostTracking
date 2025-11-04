import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { initializerFunction } from './common/app.utils';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appStoreProviders } from './store/app.store';
import { authInterceptor } from './common/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAppInitializer(initializerFunction),
    appStoreProviders,
    provideEffects([])
]
};
