import {Injectable} from '@angular/core';
import {BaseDirectory, exists, readTextFile, writeTextFile} from '@tauri-apps/plugin-fs';
import {DefaultSettings, Settings, SettingsFileName} from '@models/settings.model';
import {APP_DIR, SETTINGS_DIR} from '@models/app-constants.model';
import {from, Observable} from 'rxjs';
import {join} from '@tauri-apps/api/path';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor() {
  }

  /**
   * Reads and retrieves settings asynchronously.
   * This method returns an observable that emits the settings data when available.
   *
   * @return {Observable<Settings>} An observable emitting the settings configuration.
   */
  readSettings(): Observable<Settings> {
    return from(this.readSettingsAsync());
  }

  /**
   * Reads the settings asynchronously from the application's data directory.
   * If the settings file exists, its content will be read and parsed.
   * If the file does not exist or an error occurs, default settings will be returned.
   *
   * @return {Promise<Settings>} A promise that resolves to the settings object, or default settings if the file is not found or an error occurs.
   */
  private async readSettingsAsync(): Promise<Settings> {
    try {
      const settingsFilePath = await join(APP_DIR, SETTINGS_DIR, SettingsFileName);
      const fileExists = await exists(settingsFilePath, {baseDir: BaseDirectory.AppData});

      if (fileExists) {
        const content = await readTextFile(settingsFilePath, {baseDir: BaseDirectory.AppData});
        return JSON.parse(content) as Settings;
      } else {
        return DefaultSettings;
      }
    } catch (error) {
      console.error('Error reading settings:', error);
      return DefaultSettings;
    }
  }


  /**
   * Saves the provided settings asynchronously and returns an Observable of the saved settings.
   *
   * @param {Settings} settings - The settings object to be saved.
   * @return {Observable<Settings>} An Observable that emits the saved settings object.
   */
  saveSettings(settings: Settings): Observable<Settings> {
    return from(this.saveSettingsAsync(settings));
  }

  /**
   * Asynchronously saves the provided settings to a file in the application's data directory.
   *
   * @param {Settings} settings - The settings object to be saved to a file.
   * @return {Promise<Settings>} A promise that resolves to the saved settings object upon successful completion.
   * @throws Will throw an error if the settings cannot be saved due to file system issues or other errors.
   */
  private async saveSettingsAsync(settings: Settings): Promise<Settings> {
    try {
      const settingsFilePath = await join(APP_DIR, SETTINGS_DIR, SettingsFileName);
      await writeTextFile(
        settingsFilePath,
        JSON.stringify(settings),
        {baseDir: BaseDirectory.AppData}
      );
      return settings;
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  }
}
