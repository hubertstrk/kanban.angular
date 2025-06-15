import {Injectable} from '@angular/core';
import {BaseDirectory, exists, readDir, readTextFile, writeTextFile} from '@tauri-apps/plugin-fs';
import {Task} from '@models/task.model';
import {APP_DIR, TASKS_DIR} from '@models/app-constants.model';
import {from, Observable} from 'rxjs';
import {join} from '@tauri-apps/api/path';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor() {
  }

  /**
   * Retrieves all the tasks available.
   *
   * @return {Observable<Task[]>} An observable emitting a list of Task objects.
   */
  readAllTasks(): Observable<Task[]> {
    return from(this.readAllTasksAsync());
  }

  /**
   * Reads all task items asynchronously from the application's data directory.
   * It finds and parses all valid task files, ignoring invalid or malformed files.
   *
   * @return {Promise<Task[]>} A promise that resolves to an array of task objects.
   * If the tasks directory does not exist or an error occurs, an empty array is returned.
   */
  private async readAllTasksAsync(): Promise<Task[]> {
    try {
      const tasksDirPath = await join(APP_DIR, TASKS_DIR);

      const dirExists = await exists(tasksDirPath, {baseDir: BaseDirectory.AppData});
      if (!dirExists) {
        return [];
      }

      const entries = await readDir(tasksDirPath, {baseDir: BaseDirectory.AppData});
      const taskPromises = entries
        .filter(entry => entry.isFile)
        .map(async entry => {
          const filePath = await join(tasksDirPath, entry.name);
          try {
            const content = await readTextFile(filePath, {baseDir: BaseDirectory.AppData});
            return JSON.parse(content) as Task;
          } catch (error) {
            console.error(`Error reading task file ${entry.name}:`, error);
            return null;
          }
        });

      const tasks = await Promise.all(taskPromises);
      return tasks.filter(task => task !== null) as Task[];
    } catch (error) {
      console.error('Error reading tasks:', error);
      return [];
    }
  }

  /**
   * Persists a task item asynchronously.
   *
   * @param {Task} task - The task item to be saved.
   * @return {Observable<Task>} An observable that emits the saved task item upon successful completion.
   */
  saveTask(task: Task): Observable<Task> {
    return from(this.saveTaskAsync(task));
  }

  /**
   * Asynchronously saves a Task object to a file in the application's data directory.
   *
   * @param {Task} task - The Task object to be saved.
   * @return {Promise<Task>} A promise that resolves to the saved Task object.
   * @throws Will throw an error if there is an issue saving the Task object.
   */
  private async saveTaskAsync(task: Task): Promise<Task> {
    try {
      const tasksDirPath = await join(APP_DIR, TASKS_DIR);
      const taskFilePath = await join(tasksDirPath, `${task.id}.json`);

      await writeTextFile(
        taskFilePath,
        JSON.stringify(task),
        {baseDir: BaseDirectory.AppData}
      );

      return task;
    } catch (error) {
      console.error('Error saving task:', error);
      throw error;
    }
  }
}
