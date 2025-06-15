export enum TodoStatus {
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
  status: TodoStatus;
}
