import { ActionReducerMap } from '@ngrx/store';
import * as fromSettings from './settings/settings.reducer';
import * as fromTasks from './tasks/tasks.reducer';
import { SettingsEffects } from './settings/settings.effects';
import { TasksEffects } from './tasks/tasks.effects';

export interface AppState {
  settings: fromSettings.SettingsState;
  tasks: fromTasks.TasksState;
}

export const reducers: ActionReducerMap<AppState> = {
  settings: fromSettings.settingsReducer,
  tasks: fromTasks.tasksReducer
};

export const effects = [
  SettingsEffects,
  TasksEffects
];
