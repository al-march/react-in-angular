import {AfterViewInit, Directive, ElementRef, inject, INJECTOR, input, OnDestroy} from "@angular/core";
import React, {FC} from "react";
import {createRoot, Root} from "react-dom/client";
import {useNgStore} from "@/core/state";
import {AppearanceProvider, AppRoot} from "@vkontakte/vkui";
import {useThemeStore} from "@/core/state/theme.state";
import {combineLatest} from "rxjs";
import {takeUntilDestroyed, toObservable} from "@angular/core/rxjs-interop";
import {NgContext} from "@/shared/react-component/AngularContext";

type InferProps<C> = C extends FC<infer Props> ? Props : never;

@Directive({
  selector: "[react], app-react",
  standalone: true
})
export class ReactComponent<Comp extends FC<any>> implements AfterViewInit, OnDestroy {
  private readonly injector = inject(INJECTOR);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private root?: Root;

  readonly theme = useNgStore(useThemeStore);
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
        <NgContext.Provider value={{injector: this.injector}}>
          <AppearanceProvider value={this.theme().mode}>
            <AppRoot mode="embedded">
              <Component {...this.props()} />
            </AppRoot>
          </AppearanceProvider>
        </NgContext.Provider>
      );
    }
  }
}
