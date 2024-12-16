import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HostReact} from '@/shared/react-component';
import {PageMain} from './PageMain';

@Component({
  selector: 'app-page-main',
  imports: [
    HostReact
  ],
  template: `
    <app-react
      [react]="PageMain"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PageMainComponent {
  protected readonly PageMain = PageMain;
}
