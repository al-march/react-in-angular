import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ReactComponent} from '@/shared/react-component';
import {PageMain} from './PageMain';

@Component({
  selector: 'app-page-main',
  imports: [
    ReactComponent
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
