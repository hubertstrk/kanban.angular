import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SafeHtml} from "@angular/platform-browser";

import {Store} from '@ngrx/store';
import {Subject, takeUntil} from "rxjs";

import {deleteTask, updateTask} from '@store/tasks/tasks.actions';

import {PriorityOptions, Task, TaskPriority} from '@models/task.model';

import {IconService} from "@services/icons.service";

import {ButtonComponent} from '@app/shared/button/app-button.component';
import {ModalComponent} from '@app/shared/modal/app-modal.component';
import {DropdownComponent} from '@app/shared/dropdown/app-dropdown.component';
import {DatePickerComponent} from '@app/shared/date-picker/app-date-picker.component';
import {MonacoEditorComponent} from '@app/shared/monaco-editor/app-monaco-editor.component';
import {DueDatePipe} from '@app/shared/task-card/due-date.pipe';
import {TaskViewComponent} from "@app/shared/task-view/task-view.component";

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MonacoEditorComponent, ModalComponent, FormsModule, DropdownComponent, DatePickerComponent, DueDatePipe, TaskViewComponent],
  templateUrl: './app-task-card.component.html',
})
export class TaskCardComponent implements OnInit, OnDestroy {
  @Input() task!: Task;

  icons: { [key: string]: SafeHtml } = {};
  isEditModalOpen = false;
  isViewModalOpen = false;
  editedTask: Partial<Task> = {};
  priorityOptions = PriorityOptions;
  destroy$ = new Subject<void>();
  protected readonly TaskPriority = TaskPriority;

  constructor(private store: Store, private iconsService: IconService) {
  }


  onDeleteTask(): void {
    this.store.dispatch(deleteTask({id: this.task.id}));
  }

  onOpenViewModal(): void {
    this.isViewModalOpen = true;
  }

  onOpenEditModal(): void {
    this.editedTask = {
      title: this.task.title,
      content: this.task.content,
      priority: this.task.priority || TaskPriority.Medium,
      dueAt: this.task.dueAt
    };
    this.isEditModalOpen = true;
  }

  closeModal(): void {
    this.isEditModalOpen = false;
    this.isViewModalOpen = false;
  }

  saveTask(): void {
    const updatedTask: Task = {
      ...this.task,
      title: this.editedTask.title || '',
      content: this.editedTask.content || '',
      priority: this.editedTask.priority || TaskPriority.Medium,
      dueAt: this.editedTask.dueAt || null,
    };

    this.store.dispatch(updateTask({task: updatedTask}));
    this.closeModal();
  }

  isOverdue(): boolean {
    if (!this.task.dueAt) return false;

    const now = new Date();
    const dueDate = new Date(this.task.dueAt);
    return dueDate.getTime() - now.getTime() < 0;
  }

  getDueClass(): string {
    const doneClass = this.task.status === 'done' ? 'line-through' : '';
    const overdueClass = this.isOverdue() ? 'text-red-500' : 'text-zinc-400 dark:text-neutral-300';
    return `text-sm ${doneClass} ${overdueClass}`;
  }

  onPriorityChange(priority: string): void {
    this.editedTask.priority = priority as TaskPriority;
  }

  onDueDateChange(date: string): void {
    this.editedTask.dueAt = date;
  }

  getTitleClass(): string {
    const base = 'text-lg text-zinc-500 dark:text-neutral-100';
    const doneClass = this.task.status === 'done' ? 'line-through' : '';
    return `${base} ${doneClass}`;
  }

  getTaskContent(content: string): string {
    return content.substring(0, 200) + (content.length > 200 ? '...' : '');
  }

  getPriorityClass(): string {
    const base = 'min-w-1 max-w-1'

    const getPriorityClass = ((priority: TaskPriority) => {
      switch (priority) {
        case TaskPriority.Low:
          return 'bg-green-400';
        case TaskPriority.Medium:
          return 'bg-yellow-500';
        case TaskPriority.High:
          return 'bg-red-500';
        default:
          return 'bg-gray-400';
      }
    });

    return `${base} ${getPriorityClass(this.task.priority || TaskPriority.Medium)}`;
  }

  ngOnInit(): void {
    this.iconsService.getIcons(['fluent--delete-24-regular', 'fluent--note-24-regular']).pipe(takeUntil(this.destroy$)).subscribe(icons => {
      this.icons = icons;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
