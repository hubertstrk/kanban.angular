import {Injectable} from '@angular/core';
import {BaseDirectory, exists, readDir, readTextFile, writeTextFile} from '@tauri-apps/plugin-fs';
import {Todo} from '@models/todo.model';
import {APP_DIR, TODOS_DIR} from '@models/app-constants.model';
import {from, Observable} from 'rxjs';
import {join} from '@tauri-apps/api/path';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  constructor() {
  }

  /**
   * Retrieves all the todos available.
   *
   * @return {Observable<Todo[]>} An observable emitting a list of Todo objects.
   */
  readAllTodos(): Observable<Todo[]> {
    return from(this.readAllTodosAsync());
  }

  /**
   * Reads all todo items asynchronously from the application's data directory.
   * It finds and parses all valid todo files, ignoring invalid or malformed files.
   *
   * @return {Promise<Todo[]>} A promise that resolves to an array of todo objects.
   * If the todos directory does not exist or an error occurs, an empty array is returned.
   */
  private async readAllTodosAsync(): Promise<Todo[]> {
    try {
      const todosDirPath = await join(APP_DIR, TODOS_DIR);

      const dirExists = await exists(todosDirPath, {baseDir: BaseDirectory.AppData});
      if (!dirExists) {
        return [];
      }

      const entries = await readDir(todosDirPath, {baseDir: BaseDirectory.AppData});
      const todoPromises = entries
        .filter(entry => entry.isFile)
        .map(async entry => {
          const filePath = await join(todosDirPath, entry.name);
          try {
            const content = await readTextFile(filePath, {baseDir: BaseDirectory.AppData});
            return JSON.parse(content) as Todo;
          } catch (error) {
            console.error(`Error reading todo file ${entry.name}:`, error);
            return null;
          }
        });

      const todos = await Promise.all(todoPromises);
      return todos.filter(todo => todo !== null) as Todo[];
    } catch (error) {
      console.error('Error reading todos:', error);
      return [];
    }
  }

  /**
   * Persists a todo item asynchronously.
   *
   * @param {Todo} todo - The todo item to be saved.
   * @return {Observable<Todo>} An observable that emits the saved todo item upon successful completion.
   */
  saveTodo(todo: Todo): Observable<Todo> {
    return from(this.saveTodoAsync(todo));
  }

  /**
   * Asynchronously saves a Todo object to a file in the application's data directory.
   *
   * @param {Todo} todo - The Todo object to be saved.
   * @return {Promise<Todo>} A promise that resolves to the saved Todo object.
   * @throws Will throw an error if there is an issue saving the Todo object.
   */
  private async saveTodoAsync(todo: Todo): Promise<Todo> {
    try {
      const todosDirPath = await join(APP_DIR, TODOS_DIR);
      const todoFilePath = await join(todosDirPath, `${todo.id}.json`);

      await writeTextFile(
        todoFilePath,
        JSON.stringify(todo),
        {baseDir: BaseDirectory.AppData}
      );

      return todo;
    } catch (error) {
      console.error('Error saving todo:', error);
      throw error;
    }
  }
}
