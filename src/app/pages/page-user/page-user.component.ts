import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ReactComponent} from '@/shared/react-component';
import {PageUser} from './PageUser';

@Component({
  selector: 'app-page-user',
  imports: [
    ReactComponent
  ],
  template: `
    <app-react
      [react]="PageUser"
      [props]="{userId: id()}"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PageUserComponent {
  readonly id = input.required<string>();
  protected readonly PageUser = PageUser;
}
