import {
  BaseDirectory,
  exists,
  mkdir,
  writeTextFile,
} from '@tauri-apps/plugin-fs';

import {join} from '@tauri-apps/api/path';


import {DefaultSettings, SettingsFileName} from '@models/settings.model';
import {APP_DIR, SETTINGS_DIR, TASKS_DIR} from '@models/app-constants.model';

export async function initSettingsFactory() {
  // ensure app directory
  const appDirPath = APP_DIR;
  const appDirExists = await exists(appDirPath, {
    baseDir: BaseDirectory.AppData,
  });

  if (!appDirExists) {
    await mkdir(appDirPath, {baseDir: BaseDirectory.AppData, recursive: true});
    console.info('App directory created');
  }

  // ensure settings directory
  const settingsDirPath = await join(APP_DIR, SETTINGS_DIR);
  const settingsDirExists = await exists(settingsDirPath, {
    baseDir: BaseDirectory.AppData,
  });

  if (!settingsDirExists) {
    await mkdir(settingsDirPath, {baseDir: BaseDirectory.AppData, recursive: true});
    console.info('Settings directory created');
  }

  // ensure tasks directory
  const tasksDirPath = await join(APP_DIR, TASKS_DIR);
  const tasksDirExists = await exists(tasksDirPath, {
    baseDir: BaseDirectory.AppData,
  });

  if (!tasksDirExists) {
    await mkdir(tasksDirPath, {baseDir: BaseDirectory.AppData, recursive: true});
    console.info('Tasks directory created');
  }

  // ensure user settings file
  const settingsFilePath = await join(APP_DIR, SETTINGS_DIR, SettingsFileName);
  const settingsFileExists = await exists(settingsFilePath, {
    baseDir: BaseDirectory.AppData,
  });

  if (!settingsFileExists) {
    await writeTextFile(
      settingsFilePath,
      JSON.stringify(DefaultSettings),
      {baseDir: BaseDirectory.AppData}
    );
    console.info('App initialize: created user settings');
  }
}
