import { ActionReducerMap } from '@ngrx/store';
import * as fromSettings from './settings/settings.reducer';
import * as fromTodos from './todos/todos.reducer';
import { SettingsEffects } from './settings/settings.effects';
import { TodosEffects } from './todos/todos.effects';

export interface AppState {
  settings: fromSettings.SettingsState;
  todos: fromTodos.TodosState;
}

export const reducers: ActionReducerMap<AppState> = {
  settings: fromSettings.settingsReducer,
  todos: fromTodos.todosReducer
};

export const effects = [
  SettingsEffects,
  TodosEffects
];
