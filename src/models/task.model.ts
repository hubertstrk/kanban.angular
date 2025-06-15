export enum TaskStatus {
  TODO = 'todo',
  PROGRESS = 'progress',
  DONE = 'done',
  DELETED = 'deleted'
}

export interface Task {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  dueAt: string;
  status: TaskStatus;
}
