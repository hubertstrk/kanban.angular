import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-tag.component.html',
})
export class TagComponent {
  @Input() text: string = '';
  @Input() color: string = 'bg-sky-500';
  @Input() textColor: string = 'text-white';

  get computedClasses(): string {
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${this.color} ${this.textColor} dark:opacity-90`;
  }
}
