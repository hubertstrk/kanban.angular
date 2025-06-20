import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {getCurrentWebviewWindow} from '@tauri-apps/api/webviewWindow';
import {Subject, take, takeUntil} from 'rxjs';
import {IconService} from "@services/icons.service";
import {SafeHtml} from '@angular/platform-browser';
import {SettingsService} from '@services/settings.service';
import {v4} from 'uuid';

import {ButtonComponent} from '../shared/button/app-button.component';
import {ModalComponent} from '../shared/modal/app-modal.component';
import {TextInputComponent} from '../shared/text-input/app-text-input.component';
import {TaskCardComponent} from '../shared/task-card/app-task-card.component';
import {SectionHeaderComponent} from '../shared/section-header/app-section-header.component';
import {DropdownComponent} from '../shared/dropdown/app-dropdown.component';
import {DatePickerComponent} from '../shared/date-picker/app-date-picker.component';
import {MonacoEditorComponent} from '../shared/monaco-editor/app-monaco-editor.component';

import {Store} from '@ngrx/store';
import {createTask, updateTask} from '@store/tasks/tasks.actions';
import {selectTasksByStatus} from "@store/tasks/tasks.selectors";
import {PriorityOptions, Task, TaskPriority, TaskStatus, TaskStatusMapping} from "@models/task.model";
import {AppState} from "@store/index";
import {saveSettings} from '@store/settings/settings.actions';
import {selectDarkMode, selectSettings} from '@store/settings/settings.selectors';

import {sortBy} from 'lodash-es';
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";

const appWindow = getCurrentWebviewWindow();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, ModalComponent, TextInputComponent, TaskCardComponent, SectionHeaderComponent, CdkDropList, CdkDrag, CdkDropListGroup, DropdownComponent, DatePickerComponent, MonacoEditorComponent],
  providers: [IconService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  todos: Task[] = [];
  progress: Task[] = [];
  done: Task[] = [];
  icons: { [key: string]: SafeHtml } = {};
  statusMapping = TaskStatusMapping;
  priorityOptions = PriorityOptions;

  isModalOpen = false;
  taskName = '';
  taskContent = '';
  taskPriority = TaskPriority.Low;
  taskDueDate: string | null = null;

  isDarkMode = false;

  selectSettings$ = this.store.select(selectSettings);
  selectDarkMode$ = this.store.select(selectDarkMode);
  selectTodos$ = this.store.select(selectTasksByStatus(TaskStatus.Todo));
  selectProgress$ = this.store.select(selectTasksByStatus(TaskStatus.Progress));
  selectDone$ = this.store.select(selectTasksByStatus(TaskStatus.Done));

  private destroy$ = new Subject<void>();

  constructor(
    private iconService: IconService,
    private settingsService: SettingsService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
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

    this.selectDarkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe((dark) => {
        this.isDarkMode = dark;
        this.isDarkMode
          ? document.documentElement.classList.add('dark')
          : document.documentElement.classList.remove('dark');
      });

    this.selectTodos$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.todos = sortBy(tasks, ['dueAt', 'title'], ['desc', 'asc']);
      });

    this.selectProgress$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.progress = sortBy(tasks, ['dueAt', 'title'], ['desc', 'asc']);
      });

    this.selectDone$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.done = sortBy(tasks, ['dueAt', 'title'], ['desc', 'asc']);
      });
  }

  toggleDarkMode(): void {
    this.selectSettings$.pipe(take(1)).subscribe((settings) => {
      const updateSettings = {
        ...settings,
        dark: !settings.dark
      }
      this.store.dispatch(saveSettings({settings: updateSettings}));
    })
  }

  createNewTask(): void {
    this.isModalOpen = true;
    this.taskName = '';
    this.taskContent = '';
    this.taskPriority = TaskPriority.Low;
    this.taskDueDate = null;
  }

  onPriorityChange(priority: string): void {
    this.taskPriority = priority as TaskPriority;
  }

  onDueDateChange(date: string): void {
    this.taskDueDate = date;
  }

  saveTask(): void {
    this.store.dispatch(createTask({
      task: {
        id: v4(),
        title: this.taskName,
        content: this.taskContent,
        status: TaskStatus.Todo,
        createdAt: new Date().toISOString(),
        dueAt: this.taskDueDate,
        priority: this.taskPriority
      }
    }))

    this.closeModal();
  }

  getColumnClass(): string {
    return 'bg-gray-50 dark:bg-zinc-700 py-4 rounded-lg flex flex-col max-h-full overflow-y-auto';
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

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer.id === event.container.id) return;

    const task = event.previousContainer.data[event.previousIndex];

    const newStatus = this.statusMapping[event.container.id]

    const updatedTask = {...task, status: newStatus} as Task;

    this.store.dispatch(updateTask({task: updatedTask}));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
