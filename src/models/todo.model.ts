export enum TaskStatus {
  TODO = 'todo',
  PROGRESS = 'progress',
  DONE = 'done',
  DELETED = 'deleted'
}

export interface Todo {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  dueAt: string;
  status: TaskStatus;
}

export const TaskStatusMapping: Record<string, TaskStatus> = {
  ['progress-list']: TaskStatus.PROGRESS,
  ['todo-list']: TaskStatus.TODO,
  ['done-list']: TaskStatus.DONE,
  ['deleted-list']: TaskStatus.DELETED,
};
