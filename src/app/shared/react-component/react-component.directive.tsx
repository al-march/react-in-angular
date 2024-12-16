import {AfterViewInit, Directive, ElementRef, inject, INJECTOR, input, OnDestroy} from "@angular/core";
import React, {FC} from "react";
import {createRoot, Root} from "react-dom/client";
import {useNgStore} from "@/core/state";
import {AppRoot, ConfigProvider} from "@vkontakte/vkui";
import {useThemeStore} from "@/core/state/theme.state";
import {combineLatest} from "rxjs";
import {takeUntilDestroyed, toObservable} from "@angular/core/rxjs-interop";
import {NgContext} from "@/shared/react-component/AngularContext";

@Directive({
  selector: "[react], app-react",
  standalone: true
})
export class ReactComponent<T> implements AfterViewInit, OnDestroy {
  private readonly injector = inject(INJECTOR);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private root?: Root;

  readonly theme = useNgStore(useThemeStore);
  readonly react = input.required<FC<T>>();
  readonly props = input<T>();

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
    const injector = this.injector;
    const Component = this.react() as FC;
    const props = this.props() || {};

    if (this.root) {
      this.root.render(
        <NgContext value={{injector}}>
          <ConfigProvider colorScheme={this.theme()?.mode ?? "light"}>
            <AppRoot mode="embedded">
              {props
                ? <Component {...props} />
                : <Component />
              }
            </AppRoot>
          </ConfigProvider>
        </NgContext>
      );
    }
  }
}
