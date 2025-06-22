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
import {TaskViewComponent} from "@app/shared/task-view/task-view.component";
import {AppDueDateComponent} from "@app/shared/task-due-date-display/app-due-date.component";
import {TaskTitleComponent} from "@app/shared/task-title-display/app-task-title-display.component";

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MonacoEditorComponent, ModalComponent, FormsModule, DropdownComponent, DatePickerComponent, TaskViewComponent, AppDueDateComponent, TaskTitleComponent],
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

  ngOnInit(): void {
    this.iconsService.getIcons(['fluent--delete-24-regular', 'fluent--note-24-regular']).pipe(takeUntil(this.destroy$)).subscribe(icons => {
      this.icons = icons;
    });
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

  onPriorityChange(priority: string): void {
    this.editedTask.priority = priority as TaskPriority;
  }

  onDueDateChange(date: string): void {
    this.editedTask.dueAt = date;
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

  saveTask(): void {
    const updatedTask: Task = {
      ...this.task,
      title: this.editedTask.title || '',
      content: this.editedTask.content || '',
      priority: this.editedTask.priority || TaskPriority.Medium,
      dueAt: this.editedTask.dueAt || null,
    };

    this.store.dispatch(updateTask({task: updatedTask}));
    this.isEditModalOpen = false;
  }

  onDeleteTask(): void {
    this.store.dispatch(deleteTask({id: this.task.id}));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
