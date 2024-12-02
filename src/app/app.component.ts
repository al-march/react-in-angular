import {ChangeDetectionStrategy, Component, effect} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TopbarComponent} from './widgets/topbar';
import {ThemeMode, useThemeStore} from '@/core/state/theme.state';
import {useNgStore} from '@/core/state';

const modeClasses: Record<ThemeMode, string> = {
  dark: 'vkui--vkBase--dark',
  light: 'vkui--vkBase--light'
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  theme = useNgStore(useThemeStore);

  constructor() {
    effect(() => {
      const mode = this.theme().mode;

      if (mode === 'dark') {
        document.documentElement.classList.remove(modeClasses.light);
        document.documentElement.classList.add(modeClasses.dark);
      } else {
        document.documentElement.classList.remove(modeClasses.dark);
        document.documentElement.classList.add(modeClasses.light);
      }
    });
  }
}
