import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

import {Task} from "@models/task.model";
import {ModalComponent} from "@app/shared/modal/app-modal.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {marked} from "marked";
import DOMPurify from "dompurify";

import {DueDateComponent} from "@app/shared/due-date-display/due-date.component";

@Component({
  selector: 'app-task-view',
  templateUrl: 'task-view.component.html',
  standalone: true,
  imports: [
    ModalComponent,
    DueDateComponent,
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

  closeModal() {
    this.isOpen = false;
  }
}
