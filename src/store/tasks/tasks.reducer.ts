import {createReducer, on} from '@ngrx/store';
import {Task} from '@models/task.model';
import * as TasksActions from './tasks.actions';

export interface TasksState {
  tasks: Task[];
  selectedTaskId: string | null;
  loading: boolean;
  error: any;
}

export const initialState: TasksState = {
  tasks: [],
  selectedTaskId: null,
  loading: false,
  error: null
};

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.loadTasks, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TasksActions.loadTasksSuccess, (state, {tasks}) => ({
    ...state,
    tasks,
    loading: false
  })),
  on(TasksActions.loadTasksFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false
  })),
  on(TasksActions.createTask, (state, {task}) => ({
    ...state,
    tasks: [...state.tasks, task],
    loading: true,
    error: null
  })),
  on(TasksActions.createTaskSuccess, (state, {task}) => ({
    ...state,
    tasks: [...state.tasks, task],
    loading: false
  })),
  on(TasksActions.createTaskFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false
  })),
  on(TasksActions.updateTask, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TasksActions.updateTaskSuccess, (state, {task}) => ({
    ...state,
    tasks: state.tasks.map(t => t.id === task.id ? task : t),
    loading: false
  })),
  on(TasksActions.updateTaskFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false
  })),
  on(TasksActions.selectTask, (state, {id}) => ({
    ...state,
    selectedTaskId: id
  }))
);
