import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {HostReact} from '@/shared/react-component';
import {PageUser} from './PageUser';

@Component({
  selector: 'app-page-user',
  imports: [
    HostReact
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
