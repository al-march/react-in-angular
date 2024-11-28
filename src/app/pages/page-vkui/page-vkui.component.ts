import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    ></div>
  `
})
export default class PageVkuiComponent {

  protected readonly PageVkui = PageVkui;
}
