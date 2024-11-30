import {AfterViewInit, Directive, ElementRef, inject, input, OnDestroy} from "@angular/core";
import React, {FC} from "react";
import {createRoot, Root} from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "@/core/state";
import {AppearanceProvider, AppRoot} from "@vkontakte/vkui";
import {injectSelector} from "@reduxjs/angular-redux";
import {selectTheme} from "@/core/state/theme.state";
import {combineLatest} from "rxjs";
import {takeUntilDestroyed, toObservable} from "@angular/core/rxjs-interop";

type InferProps<C> = C extends FC<infer Props> ? Props : never;

@Directive({
  selector: "[react], app-react",
  standalone: true
})
export class ReactComponent<Comp extends FC<any>> implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private root?: Root;

  readonly theme = injectSelector(selectTheme);
  readonly react = input.required<Comp>();
  readonly props = input<InferProps<Comp>>();

  constructor() {
    this.checkUpdates().pipe(
      takeUntilDestroyed()
    ).subscribe(() => this.render());
  }

  ngAfterViewInit(): void {
    this.root = createRoot(this.elementRef.nativeElement);
    this.render();
  }

  ngOnDestroy(): void {
    this.root?.unmount();
  }

  protected checkUpdates() {
    return combineLatest([
      toObservable(this.theme),
      toObservable(this.react),
      toObservable(this.props)
    ]);
  }

  protected render(): void {
    const Component: FC = this.react();

    if (this.root && Component) {
      this.root.render(
        <Provider store={store}>
          <AppearanceProvider value={this.theme()}>
            <AppRoot mode="embedded">
              <Component {...this.props()} />
            </AppRoot>
          </AppearanceProvider>
        </Provider>
      );
    }
  }
}
