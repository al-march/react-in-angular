import {AfterViewInit, Directive, effect, ElementRef, inject, INJECTOR, input, OnDestroy, signal} from "@angular/core";
import React, {FC} from "react";
import {createRoot, Root} from "react-dom/client";
import {useNgStore} from "@/core/state";
import {AppRoot, ConfigProvider} from "@vkontakte/vkui";
import {useThemeStore} from "@/core/state/theme.state";
import {NgContext} from "@/shared/react-component/AngularContext";

@Directive({
  selector: "[react], app-react",
  standalone: true
})
export class HostReact<T> implements AfterViewInit, OnDestroy {
  private readonly injector = inject(INJECTOR);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly root = signal<Root | null>(null);

  /* Тема преокта */
  readonly theme = useNgStore(useThemeStore);
  /* React компонент */
  readonly react = input.required<FC<T>>();
  /* Пропсы переданного React компонента */
  readonly props = input<T>();

  constructor() {
    /**
     * Следим за изменениями всех зависимостей React.
     * Производим новый render если что-то изменилось.
     *
     * Функция effect в Angular выполняет переданный ей callback каждый раз,
     * когда один из используемых сигналов внутри получил обновленное значение.
     */
    effect(() => {
      const injector = this.injector;
      const Component = this.react() as FC;
      const props = this.props() || {};

      this.root()?.render(
        <NgContext value={{injector}}>
          <ConfigProvider colorScheme={this.theme()?.mode ?? "light"}>
            <AppRoot mode="embedded">
              <Component {...props} />
            </AppRoot>
          </ConfigProvider>
        </NgContext>
      );
    });
  }

  /* Инициализируем root при готовности HTML элемента */
  ngAfterViewInit(): void {
    this.root.set(
      createRoot(this.elementRef.nativeElement)
    );
  }

  /* Размонтируем root при уничтожении Angular компонента */
  ngOnDestroy(): void {
    this.root()?.unmount();
  }
}
