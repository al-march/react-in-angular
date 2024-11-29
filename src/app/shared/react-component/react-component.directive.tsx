import { AfterViewInit, Directive, ElementRef, inject, input, OnChanges, OnDestroy } from "@angular/core";
import React, { FC } from "react";
import { createRoot, Root } from "react-dom/client";

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
      this.root.render(<Component {...this.props()} />);
    }
  }
}
