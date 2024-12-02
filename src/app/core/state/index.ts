import {StoreApi} from 'zustand';
import {Observable} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';


export function useNgStore<T>(store: StoreApi<T>) {
  const state$ = new Observable<T>((subscriber) => {
    subscriber.next(store.getState());
    const unsubscribe = store.subscribe((state) => subscriber.next(state));
    return () => unsubscribe();
  });

  return toSignal(state$, {initialValue: store.getState()});
}
