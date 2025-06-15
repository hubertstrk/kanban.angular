import { createAction, props } from '@ngrx/store';
import { Todo } from '@models/todo.model';

export const loadTodos = createAction('[Todos] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todos] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodosFailure = createAction(
  '[Todos] Load Todos Failure',
  props<{ error: any }>()
);

export const createTodo = createAction(
  '[Todos] Create Todo',
  props<{ todo: Todo }>()
);
export const createTodoSuccess = createAction(
  '[Todos] Create Todo Success',
  props<{ todo: Todo }>()
);
export const createTodoFailure = createAction(
  '[Todos] Create Todo Failure',
  props<{ error: any }>()
);

export const updateTodo = createAction(
  '[Todos] Update Todo',
  props<{ todo: Todo }>()
);
export const updateTodoSuccess = createAction(
  '[Todos] Update Todo Success',
  props<{ todo: Todo }>()
);
export const updateTodoFailure = createAction(
  '[Todos] Update Todo Failure',
  props<{ error: any }>()
);

export const selectTodo = createAction(
  '[Todos] Select Todo',
  props<{ id: string | null }>()
);
