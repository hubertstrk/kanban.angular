import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Task, TaskPriority} from '@models/task.model';
import {Store} from '@ngrx/store';
import {deleteTask, updateTask} from '@store/tasks/tasks.actions';
import {ButtonComponent} from '../button/app-button.component';
import {IconService} from "@services/icons.service";
import {SafeHtml} from "@angular/platform-browser";
import {Subject, takeUntil} from "rxjs";
import {ModalComponent} from '../modal/app-modal.component';
import {FormsModule} from '@angular/forms';
import {DropdownComponent, DropdownOption} from '../dropdown/app-dropdown.component';
import {TagComponent} from '../tag/app-tag.component';
import {DatePickerComponent} from '../date-picker/app-date-picker.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ModalComponent, FormsModule, DropdownComponent, TagComponent, DatePickerComponent],
  templateUrl: './app-task-card.component.html',
})
export class TaskCardComponent implements OnInit, OnDestroy {
  @Input() task!: Task;

  icons: { [key: string]: SafeHtml } = {};
  isModalOpen = false;
  editedTask: Partial<Task> = {};

  protected readonly TaskPriority = TaskPriority;
  priorityOptions: DropdownOption[] = [
    { value: TaskPriority.Low, label: 'Low' },
    { value: TaskPriority.Medium, label: 'Medium' },
    { value: TaskPriority.High, label: 'High' }
  ];

  destroy$ = new Subject<void>();

  constructor(private store: Store, private iconsService: IconService) {
  }

  onDeleteTask(): void {
    this.store.dispatch(deleteTask({id: this.task.id}));
  }

  onEditTask(): void {
    this.editedTask = {
      title: this.task.title,
      content: this.task.content,
      priority: this.task.priority || TaskPriority.Medium,
      dueAt: this.task.dueAt
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
      content: this.editedTask.content || '',
      priority: this.editedTask.priority || TaskPriority.Medium,
      dueAt: this.editedTask.dueAt || null,
    };

    this.store.dispatch(updateTask({task: updatedTask}));
    this.closeModal();
  }

  onPriorityChange(priority: string): void {
    this.editedTask.priority = priority as TaskPriority;
  }

  onDueDateChange(date: string): void {
    this.editedTask.dueAt = date;
  }

  getPriorityColor(priority?: TaskPriority): string {
    if (!priority) return 'bg-gray-400';

    switch (priority) {
      case TaskPriority.Low:
        return 'bg-green-500';
      case TaskPriority.Medium:
        return 'bg-yellow-500';
      case TaskPriority.High:
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
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
    const base = 'text-lg text-zinc-500 dark:text-neutral-100';
    const doneClass = this.task.status === 'done' ? 'line-through' : '';
    return `${base} ${doneClass}`;
  }

  getDueAtClass(): string {
    const base = 'text-sm text-zinc-400 dark:text-neutral-300';
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
