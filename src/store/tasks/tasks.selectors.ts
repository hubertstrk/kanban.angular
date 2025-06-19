import { createSelector } from '@ngrx/store';
import { AppState } from '@store/index';
import { TaskStatus } from '@models/task.model';

// Feature selector
export const selectTasksState = (state: AppState) => state.tasks;

// Select all tasks
export const selectAllTasks = createSelector(
  selectTasksState,
  (state) => state.tasks
);

// Select tasks by status
export const selectTasksByStatus = (status: TaskStatus) => createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(task => task.status === status)
);

// Predefined selectors for each status
export const selectTodoTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(task => task.status === TaskStatus.Todo)
);

export const selectProgressTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(task => task.status === TaskStatus.Progress)
);

export const selectDoneTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(task => task.status === TaskStatus.Done)
);

export const selectDeletedTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(task => task.status === TaskStatus.Deleted)
);

// Select loading state
export const selectTasksLoading = createSelector(
  selectTasksState,
  (state) => state.loading
);

// Select error state
export const selectTasksError = createSelector(
  selectTasksState,
  (state) => state.error
);

// Select selected task ID
export const selectSelectedTaskId = createSelector(
  selectTasksState,
  (state) => state.selectedTaskId
);

// Select selected task
export const selectSelectedTask = createSelector(
  selectAllTasks,
  selectSelectedTaskId,
  (tasks, selectedId) => tasks.find(task => task.id === selectedId) || null
);
