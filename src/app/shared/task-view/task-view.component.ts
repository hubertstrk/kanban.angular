import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

import {Task} from "@models/task.model";
import {ModalComponent} from "@app/shared/modal/app-modal.component";

import {DueDatePipe} from "@app/shared/task-card/due-date.pipe";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {marked} from "marked";
import DOMPurify from "dompurify";


@Component({
  selector: 'app-task-view',
  templateUrl: 'task-view.component.html',
  standalone: true,
  imports: [
    ModalComponent,
    DueDatePipe,
    NgClass,
    NgIf
  ]
})
export class TaskViewComponent {
  @Input() task!: Task;

  @Input() isOpen: boolean = false;

  constructor(private sanitizer: DomSanitizer) {
  }

  getRenderedContent(): SafeHtml {
    if (!this.task.content) return '';

    const html = marked(this.task.content) as string;
    const sanitizedHtml = DOMPurify.sanitize(html);
    return this.sanitizer.bypassSecurityTrustHtml(sanitizedHtml);
  }

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

  closeModal() {
    this.isOpen = false;
  }
}
