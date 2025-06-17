import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as TasksActions from './tasks.actions';
import {TasksService} from '@services/tasks.service';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private tasksService: TasksService
  ) {
  }

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      switchMap(() =>
        this.tasksService.readAllTasks().pipe(
          map(tasks => TasksActions.loadTasksSuccess({tasks})),
          catchError(error => of(TasksActions.loadTasksFailure({error})))
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.createTask),
      switchMap(({task}) =>
        this.tasksService.saveTask(task).pipe(
          map(createdTask => TasksActions.createTaskSuccess({task: createdTask})),
          catchError(error => of(TasksActions.createTaskFailure({error})))
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      switchMap(({task}) =>
        this.tasksService.saveTask(task).pipe(
          map(updatedTask => TasksActions.updateTaskSuccess({task: updatedTask})),
          catchError(error => of(TasksActions.updateTaskFailure({error})))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      switchMap(({id}) =>
        this.tasksService.deleteTask(id).pipe(
          map(() => TasksActions.loadTasks()), // Reload tasks after deletion
          catchError(error => of(TasksActions.loadTasksFailure({error})))
        )
      )
    )
  );
}
