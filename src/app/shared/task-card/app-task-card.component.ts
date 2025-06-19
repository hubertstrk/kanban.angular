import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Task} from '@models/task.model';
import {Store} from '@ngrx/store';
import {deleteTask, updateTask} from '@store/tasks/tasks.actions';
import {ButtonComponent} from '../button/app-button.component';
import {IconService} from "@services/icons.service";
import {SafeHtml} from "@angular/platform-browser";
import {Subject, takeUntil} from "rxjs";
import {ModalComponent} from '../modal/app-modal.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ModalComponent, FormsModule],
  templateUrl: './app-task-card.component.html',
})
export class TaskCardComponent implements OnInit, OnDestroy {
  @Input() task!: Task;

  icons: { [key: string]: SafeHtml } = {};
  isModalOpen = false;
  editedTask: Partial<Task> = {};

  destroy$ = new Subject<void>();

  constructor(private store: Store, private iconsService: IconService) {
  }

  onDeleteTask(): void {
    this.store.dispatch(deleteTask({id: this.task.id}));
  }

  onEditTask(): void {
    this.editedTask = {
      title: this.task.title,
      content: this.task.content
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveTask(): void {
    const updatedTask: Task = {
      ...this.task,
      title: this.editedTask.title || '',
      content: this.editedTask.content || ''
    };

    this.store.dispatch(updateTask({task: updatedTask}));
    this.closeModal();
  }

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
    const base = 'text-zinc-500 dark:text-neutral-100';
    const doneClass = this.task.status === 'done' ? 'line-through' : '';
    return `${base} ${doneClass}`;
  }

  getTaskContent(content: string): string {
    return content.substring(0, 200) + (content.length > 200 ? '...' : '');
  }

  onTextMouseDown(event: MouseEvent): void {
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.iconsService.getIcons(['fluent--delete-24-regular']).pipe(takeUntil(this.destroy$)).subscribe(icons => {
      this.icons = icons;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
