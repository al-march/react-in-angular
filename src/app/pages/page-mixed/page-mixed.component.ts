import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactComponent } from '../../react-component';
import { ReactContent } from './ReactContent';

@Component({
  selector: 'app-page-mixed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactComponent
  ],
  template: `
    <div>
      I am an angular template!
    </div>

    <div
      [react]="Content"
      [props]="{children: 'I am an React template!'}"
    ></div>
  `
})
export default class PageMixedComponent {
  protected readonly Content = ReactContent;
}
