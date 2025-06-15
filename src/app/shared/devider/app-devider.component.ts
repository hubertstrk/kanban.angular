import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-devider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-devider.component.html',
})
export class AppDeviderComponent {
  @Input() variant: 'light' | 'dark' | 'auto' = 'auto';
  @Input() margin: 'none' | 'sm' | 'md' | 'lg' = 'md';

  get deviderClasses(): string {
    const marginClasses = {
      none: 'my-0',
      sm: 'my-1',
      md: 'my-2',
      lg: 'my-4'
    };

    if (this.variant === 'auto') {
      return `
        w-full border-0 border-b border-zinc-200 dark:border-zinc-700
        ${marginClasses[this.margin]}
      `;
    }

    const borderColor = this.variant === 'light'
      ? 'border-zinc-200'
      : 'border-zinc-700';

    return `
      w-full border-0 border-b ${borderColor}
      ${marginClasses[this.margin]}
    `;
  }
}
