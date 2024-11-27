import { AfterViewInit, Directive, ElementRef, inject, input, OnChanges } from "@angular/core";
import React, { FC } from "react";
import { createRoot, Root } from "react-dom/client";

type InferProps<C> = C extends FC<infer Props> ? Props : never;

@Directive({
  selector: "app-react-wrapper",
  standalone: true
})
export class ReactWrapper<Comp extends FC<any>> implements AfterViewInit, OnChanges {
  private readonly elementRef = inject(ElementRef);
  private root?: Root;

  readonly component = input<Comp>();
  readonly props = input<InferProps<Comp>>();

  ngAfterViewInit(): void {
    this.root = createRoot(this.elementRef.nativeElement);
    this.render();
  }

  ngOnChanges(): void {
    this.render();
  }

  render(): void {
    const Component = this.component() as FC;
    if (this.root && Component) {
      this.root.render(<Component {...this.props()} />);
    }
  }
}
