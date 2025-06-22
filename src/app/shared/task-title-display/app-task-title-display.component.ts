import {Component, Input} from '@angular/core';
import {Task} from "@models/task.model";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-task-title-display',
  templateUrl: 'app-task-title-display.component.html',
  standalone: true,
  imports: [NgClass]
})
export class TaskTitleComponent {
  @Input() task!: Task

  getTitleClass(): string {
    const base = 'text-lg text-zinc-500 dark:text-neutral-100';
    const doneClass = this.task.status === 'done' ? 'line-through' : '';
    return `${base} ${doneClass}`;
  }
}
