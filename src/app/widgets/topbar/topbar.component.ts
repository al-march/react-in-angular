import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HostReact} from '@/shared/react-component';
import {Topbar} from './Topbar';

@Component({
  selector: 'app-topbar',
  imports: [
    HostReact
  ],
  template: `
    <app-react
      [react]="Topbar"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent {
  protected readonly Topbar = Topbar;
}
