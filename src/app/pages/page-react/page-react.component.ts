import { PageIntro, PageIntroProps } from '@/react/page-intro/PageIntro';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FC } from 'react';
import { ReactWrapper } from '../../react-wrapper/react-wrapper.directive';
import { interval, map, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-page-react',
  imports: [ReactWrapper],
  templateUrl: './page-react.component.html',
  styleUrl: './page-react.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PageReactComponent {
  reactPage: FC<PageIntroProps> = PageIntro;

  props$: Observable<PageIntroProps> = interval(1000).pipe(
    map((count) => this.createProps(count))
  );
  props = toSignal(this.props$, {
    initialValue: this.createProps()
  });

  private createProps(count = 0): PageIntroProps {
    return {
      text: `Текущий индекс: ${count}`
    };
  }
}
