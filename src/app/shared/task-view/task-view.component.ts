import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';

import {Task} from "@models/task.model";
import {ModalComponent} from "@app/shared/modal/app-modal.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {marked} from "marked";
import DOMPurify from "dompurify";

import {AppDueDateComponent} from "@app/shared/task-due-date-display/app-due-date.component";

@Component({
  selector: 'app-task-view',
  templateUrl: 'task-view.component.html',
  standalone: true,
  imports: [ModalComponent, AppDueDateComponent, NgIf]
})
export class TaskViewComponent {
  @Input() task!: Task;
  @Input() isOpen: boolean = false;

  @Output() closed: EventEmitter<any> = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {
  }
  
  getRenderedContent(): SafeHtml {
    if (!this.task.content) return '';

    const html = marked(this.task.content) as string;
    const sanitizedHtml = DOMPurify.sanitize(html);
    return this.sanitizer.bypassSecurityTrustHtml(sanitizedHtml);
  }

  closeModal() {
    this.isOpen = false;
    this.closed.emit();
  }
}
