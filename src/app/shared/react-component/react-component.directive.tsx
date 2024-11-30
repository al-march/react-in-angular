import {AfterViewInit, Directive, ElementRef, inject, input, OnChanges, OnDestroy} from "@angular/core";
import React, {FC} from "react";
import {createRoot, Root} from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "@/core/state";
import {AppearanceProvider, AppRoot} from "@vkontakte/vkui";

type InferProps<C> = C extends FC<infer Props> ? Props : never;

@Directive({
  selector: "[react], app-react",
  standalone: true
})
export class ReactComponent<Comp extends FC<any>> implements AfterViewInit, OnChanges, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private root?: Root;

  readonly react = input.required<Comp>();
  readonly props = input<InferProps<Comp>>();

  ngAfterViewInit(): void {
    this.root = createRoot(this.elementRef.nativeElement);
    this.render();
  }

  ngOnChanges(): void {
    this.render();
  }

  ngOnDestroy(): void {
    this.root?.unmount();
  }

  protected render(): void {
    const Component: FC = this.react();

    if (this.root && Component) {
      this.root.render(
        <Provider store={store}>
          <AppearanceProvider value="dark">
            <AppRoot mode="embedded">
              <Component {...this.props()} />
            </AppRoot>
          </AppearanceProvider>
        </Provider>
      );
    }
  }
}
