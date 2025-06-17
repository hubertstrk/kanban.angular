import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-section-header.component.html',
})
export class SectionHeaderComponent {
  @Input() title!: string;
  @Input() count!: number;
}
