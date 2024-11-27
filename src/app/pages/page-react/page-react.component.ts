import { PageIntroProps, PageReact } from './PageReact';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactComponent } from '../../react-component';
import { interval, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-page-react',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactComponent],
  template: `
    <div
      [react]="PageReact"
      [props]="PageIntroProps()"
    ></div>
  `
})
export default class PageReactComponent {
  PageReact = PageReact;

  PageIntroProps = toSignal(interval(1000).pipe(map((count) => this.createProps(count))), {
    initialValue: this.createProps()
  });

  private createProps(count = 0): PageIntroProps {
    return {
      text: `Текущий индекс: ${count}`
    };
  }
}
