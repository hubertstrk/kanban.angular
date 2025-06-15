import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-hr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-hr.component.html',
})
export class HrComponent {
  @Input() variant: 'light' | 'dark' | 'auto' = 'auto';
  @Input() margin: 'none' | 'sm' | 'md' | 'lg' = 'md';

  get hrClasses(): string {
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
