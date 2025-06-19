import {DropdownOption} from "@app/shared/dropdown/app-dropdown.component";

export enum TaskStatus {
  Todo = 'todo',
  Progress = 'progress',
  Done = 'done',
}

export enum TaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}

export interface Task {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  dueAt: string | null;
  status: TaskStatus;
  priority?: TaskPriority;
}

export const TaskStatusMapping: Record<string, TaskStatus> = {
  ['progress-list']: TaskStatus.Progress,
  ['todo-list']: TaskStatus.Todo,
  ['done-list']: TaskStatus.Done,
};

export const PriorityOptions: DropdownOption[] = [
  {value: TaskPriority.Low, label: 'Low'},
  {value: TaskPriority.Medium, label: 'Medium'},
  {value: TaskPriority.High, label: 'High'}
];
