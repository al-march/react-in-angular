import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {HttpClient} from '@/core/http';
import {addUsers} from '@/core/state/user.state';
import {injectDispatch, provideRedux} from '@reduxjs/angular-redux';
import {store} from '@/core/state';
import {User} from '@/shared/models';
import {provideNgInjector} from '@/core/ng-injector';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideRedux({store}),
    provideNgInjector(),
    provideAppInitializer(async () => {
      const http = inject(HttpClient);
      const dispatch = injectDispatch();
      const response = await http.get<User[]>('users');
      const users = response.data;
      dispatch(addUsers(users));
    })
  ]
};
