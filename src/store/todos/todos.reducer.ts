import { createReducer, on } from '@ngrx/store';
import { Todo } from '@models/todo.model';
import * as TodosActions from './todos.actions';

export interface TodosState {
  todos: Todo[];
  selectedTodoId: string | null;
  loading: boolean;
  error: any;
}

export const initialState: TodosState = {
  todos: [],
  selectedTodoId: null,
  loading: false,
  error: null
};

export const todosReducer = createReducer(
  initialState,
  on(TodosActions.loadTodos, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodosActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false
  })),
  on(TodosActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(TodosActions.createTodo, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodosActions.createTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
    loading: false
  })),
  on(TodosActions.createTodoFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(TodosActions.updateTodo, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodosActions.updateTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(t => t.id === todo.id ? todo : t),
    loading: false
  })),
  on(TodosActions.updateTodoFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(TodosActions.selectTodo, (state, { id }) => ({
    ...state,
    selectedTodoId: id
  }))
);
