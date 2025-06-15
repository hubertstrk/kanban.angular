import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as SettingsActions from './settings.actions';
import { SettingsService } from '@services/settings.service';

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private settingsService: SettingsService
  ) {}

  loadSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.loadSettings),
      switchMap(() =>
        this.settingsService.readSettings().pipe(
          map(settings => SettingsActions.loadSettingsSuccess({ settings })),
          catchError(error => of(SettingsActions.loadSettingsFailure({ error })))
        )
      )
    )
  );

  saveSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.saveSettings),
      switchMap(({ settings }) =>
        this.settingsService.saveSettings(settings).pipe(
          map(savedSettings => SettingsActions.saveSettingsSuccess({ settings: savedSettings })),
          catchError(error => of(SettingsActions.saveSettingsFailure({ error })))
        )
      )
    )
  );
}
