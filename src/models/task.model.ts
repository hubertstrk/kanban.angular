export enum TaskStatus {
  Todo = 'todo',
  Progress = 'progress',
  Done = 'done',
  Deleted = 'deleted'
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
  ['deleted-list']: TaskStatus.Deleted,
};
