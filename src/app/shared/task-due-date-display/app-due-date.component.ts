import {Component, Input} from '@angular/core';
import {Task} from '@models/task.model';
import {DueDatePipe} from "@app/shared/task-card/due-date.pipe";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-due-date',
  templateUrl: 'app-due-date.component.html',
  standalone: true,
  imports: [DueDatePipe, NgIf, NgClass]
})
export class AppDueDateComponent {

  @Input() task!: Task;

  isOverdue(): boolean {
    if (!this.task.dueAt) return false;

    const now = new Date();
    const dueDate = new Date(this.task.dueAt);
    return dueDate.getTime() - now.getTime() < 0;
  }

  getDueClass(): string {
    const doneClass = this.task?.status === 'done' ? 'line-through' : '';
    const overdueClass = this.isOverdue() ? 'text-red-500' : 'text-zinc-400 dark:text-neutral-300';
    return `text-sm ${doneClass} ${overdueClass}`;
  }
}
