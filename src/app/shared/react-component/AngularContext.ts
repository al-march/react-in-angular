import {createContext} from 'react';
import {Injector} from '@angular/core';

export interface NgContextState {
  injector: Injector;
}

export const NgContext = createContext<NgContextState>({
  injector: Injector.create({providers: []})
});
