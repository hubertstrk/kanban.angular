import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {getCurrentWebviewWindow} from '@tauri-apps/api/webviewWindow';
import {Subject, takeUntil} from 'rxjs';
import {IconService} from "@services/icons.service";
import {SafeHtml} from '@angular/platform-browser';
import {SettingsService} from '@services/settings.service';
import {Settings} from '@models/settings.model';
import {v4} from 'uuid';

import {ButtonComponent} from '../shared/button/app-button.component';
import {ModalComponent} from '../shared/modal/app-modal.component';
import {TextInputComponent} from '../shared/text-input/app-text-input.component';
import {TaskCardComponent} from '../shared/task-card/app-task-card.component';
import {SectionHeaderComponent} from '../shared/section-header/app-section-header.component';

import {Store} from '@ngrx/store';
import {createTask, updateTask} from '@store/tasks/tasks.actions';
import {selectTasksByStatus} from "@store/tasks/tasks.selectors";
import {Task, TaskStatus} from "@models/task.model";
import {AppState} from "@store/index";

import {sortBy} from 'lodash-es';
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";
import {TaskStatusMapping} from "@models/todo.model";

const appWindow = getCurrentWebviewWindow();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, ModalComponent, TextInputComponent, TaskCardComponent, SectionHeaderComponent, CdkDropList, CdkDrag, CdkDropListGroup],
  providers: [IconService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  todos: Task[] = [];
  progress: Task[] = [];
  done: Task[] = [];
  deleted: Task[] = [];
  icons: { [key: string]: SafeHtml } = {};
  settings: Settings | null = null;
  statusMapping = TaskStatusMapping;

  // Modal control
  isModalOpen = false;
  taskName = '';
  taskContent = '';
  private destroy$ = new Subject<void>();

  constructor(
    private iconService: IconService,
    private settingsService: SettingsService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    // load icons
    this.iconService
      .getIcons([
        'material-symbols-light--minimize-rounded',
        'material-symbols-light--square-outline-rounded',
        'material-symbols-light--close-rounded',
        'fluent--dark-theme-24-filled',
        'fluent--weather-sunny-24-regular',
        'material-symbols-light--add'
      ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(icons => {
        this.icons = icons;
      });

    // Load settings
    this.settingsService.readSettings()
      .pipe(takeUntil(this.destroy$))
      .subscribe(settings => {
        this.settings = settings;
        this.applyTheme();
      });

    // Subscribe to tasks by status
    this.store.select(selectTasksByStatus(TaskStatus.TODO))
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.todos = sortBy(tasks, ['dueAt', 'createdAt'], ['asc', 'desc']);
      });

    this.store.select(selectTasksByStatus(TaskStatus.PROGRESS))
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.progress = sortBy(tasks, ['dueAt', 'createdAt'], ['asc', 'desc']);
      });

    this.store.select(selectTasksByStatus(TaskStatus.DONE))
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.done = sortBy(tasks, ['dueAt', 'createdAt'], ['asc', 'desc']);
      });

    this.store.select(selectTasksByStatus(TaskStatus.DELETED))
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.deleted = sortBy(tasks, ['dueAt', 'createdAt'], ['asc', 'desc']);
      });
  }

  toggleDarkMode(): void {
    if (this.settings) {
      this.settings.dark = !this.settings.dark;
      this.settingsService.saveSettings(this.settings)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.applyTheme();
        });
    }
  }

  createNewTask(): void {
    this.isModalOpen = true;
    this.taskName = '';
    this.taskContent = '';
  }

  saveTask(): void {
    try {
      this.store.dispatch(createTask({
        task: {
          id: v4(),
          title: this.taskName,
          content: this.taskContent,
          status: TaskStatus.TODO,
          createdAt: new Date().toISOString(),
          tags: [],
          dueAt: null,
        }
      }))

      this.closeModal();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  minimizeWindow(): void {
    void appWindow.minimize();
  }

  maximizeWindow(): void {
    void appWindow.toggleMaximize();
  }

  closeWindow(): void {
    void appWindow.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer.id === event.container.id) return;

    const task = event.previousContainer.data[event.previousIndex];

    const newStatus = this.statusMapping[event.container.id]

    const updatedTask = {...task, status: newStatus} as Task;

    this.store.dispatch(updateTask({task: updatedTask}));
  }

  private applyTheme(): void {
    this.settings?.dark
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }
}
