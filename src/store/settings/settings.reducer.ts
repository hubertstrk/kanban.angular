import { createReducer, on } from '@ngrx/store';
import { DefaultSettings, Settings } from '@models/settings.model';
import * as SettingsActions from './settings.actions';

export interface SettingsState {
  settings: Settings;
  loading: boolean;
  error: any;
}

export const initialState: SettingsState = {
  settings: DefaultSettings,
  loading: false,
  error: null
};

export const settingsReducer = createReducer(
  initialState,
  on(SettingsActions.loadSettings, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SettingsActions.loadSettingsSuccess, (state, { settings }) => ({
    ...state,
    settings,
    loading: false
  })),
  on(SettingsActions.loadSettingsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(SettingsActions.saveSettings, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SettingsActions.saveSettingsSuccess, (state, { settings }) => ({
    ...state,
    settings,
    loading: false
  })),
  on(SettingsActions.saveSettingsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
