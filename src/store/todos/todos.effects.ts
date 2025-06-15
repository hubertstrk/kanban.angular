import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as TodosActions from './todos.actions';
import { TodosService } from '@services/todos.service';

@Injectable()
export class TodosEffects {
  constructor(
    private actions$: Actions,
    private todosService: TodosService
  ) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTodos),
      switchMap(() =>
        this.todosService.readAllTodos().pipe(
          map(todos => TodosActions.loadTodosSuccess({ todos })),
          catchError(error => of(TodosActions.loadTodosFailure({ error })))
        )
      )
    )
  );

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.createTodo),
      switchMap(({ todo }) =>
        this.todosService.saveTodo(todo).pipe(
          map(createdTodo => TodosActions.createTodoSuccess({ todo: createdTodo })),
          catchError(error => of(TodosActions.createTodoFailure({ error })))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.updateTodo),
      switchMap(({ todo }) =>
        this.todosService.saveTodo(todo).pipe(
          map(updatedTodo => TodosActions.updateTodoSuccess({ todo: updatedTodo })),
          catchError(error => of(TodosActions.updateTodoFailure({ error })))
        )
      )
    )
  );
}
