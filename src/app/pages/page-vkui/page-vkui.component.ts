import { ChangeDetectionStrategy, Component, inject, INJECTOR, input } from '@angular/core';
import { PageVkui } from './PageVkui';
import { ReactComponent } from '../../react-component';

@Component({
  selector: 'app-page-vkui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactComponent
  ],
  template: `
    <div
      [react]="PageVkui"
      [props]="{injector, id: id()}"
    ></div>
  `
})
export default class PageVkuiComponent {
  readonly id = input<string>('');
  readonly injector = inject(INJECTOR);
  protected readonly PageVkui = PageVkui;
}
