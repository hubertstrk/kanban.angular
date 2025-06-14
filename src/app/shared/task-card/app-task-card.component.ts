import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Task} from '@models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-task-card.component.html',
})
export class TaskCardComponent {
  @Input() task!: Task;

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getTitleClass(): string {
    return `font-medium ${this.task.status === 'done' ? 'line-through text-zinc-500 dark:text-neutral-100' : ''}`;
  }
}
