import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';

import {routes} from './app.routes';
import {initSettingsFactory} from "@factory/settings.factory";
import {effects, reducers} from '@store/index';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore(reducers),
    provideEffects(effects),
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => initSettingsFactory(),
      multi: true,
    }
  ]
};
