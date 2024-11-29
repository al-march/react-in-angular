import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactComponent } from '../../shared/react-component';
import { Topbar } from './Topbar';

@Component({
  selector: 'app-topbar',
  imports: [
    ReactComponent
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
