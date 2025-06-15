import { createAction, props } from '@ngrx/store';
import { Settings } from '@models/settings.model';

export const loadSettings = createAction('[Settings] Load Settings');
export const loadSettingsSuccess = createAction(
  '[Settings] Load Settings Success',
  props<{ settings: Settings }>()
);
export const loadSettingsFailure = createAction(
  '[Settings] Load Settings Failure',
  props<{ error: any }>()
);

export const saveSettings = createAction(
  '[Settings] Save Settings',
  props<{ settings: Settings }>()
);
export const saveSettingsSuccess = createAction(
  '[Settings] Save Settings Success',
  props<{ settings: Settings }>()
);
export const saveSettingsFailure = createAction(
  '[Settings] Save Settings Failure',
  props<{ error: any }>()
);
