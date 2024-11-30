import {inject, INJECTOR, Injector, provideAppInitializer, ProviderToken} from '@angular/core';

let injector: Injector;

/**
 * Используется для получения глобальных сущностей Angular.
 * !!! Важно !!!
 * Данный инжектор работает относительно root приложения.
 */
export const useNgInjector = <T>(token: ProviderToken<T>) => {
  return injector.get(token);
};

export const provideNgInjector = () => provideAppInitializer(() => {
  injector = inject(INJECTOR);
});
