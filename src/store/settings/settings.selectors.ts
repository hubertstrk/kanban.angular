import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@store/index';
import { SettingsState } from './settings.reducer';

export const selectSettingsState = createFeatureSelector<AppState, SettingsState>('settings');

export const selectSettings = createSelector(
  selectSettingsState,
  (state: SettingsState) => state.settings
);

export const selectDarkMode = createSelector(
  selectSettings,
  settings => settings.dark
);
