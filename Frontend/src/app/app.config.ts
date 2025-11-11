import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { initializerFunction } from './common/app.utils';
import { provideEffects } from '@ngrx/effects';
import { appStoreProviders } from './store/app.store';
import { authInterceptor } from './common/interceptors/auth-interceptor';
import { retryInterceptor } from './common/interceptors/retry-interceptor-interceptor';
import { authErrorInterceptor } from './common/interceptors/auth-error-interceptor-interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.development';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([authInterceptor, retryInterceptor, authErrorInterceptor])),
    provideAppInitializer(initializerFunction),
    appStoreProviders
   
  ]
};
