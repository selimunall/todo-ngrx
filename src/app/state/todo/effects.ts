import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { todoAction } from './actions';
import { catchError, map, switchMap, tap } from 'rxjs';
import { TodoApi } from '../../api/todo-api';
import { TodoStateService } from './facade';
import { TodoInterface } from './reducer';

export const initialize = createEffect(
  () => {
    return inject(Actions).pipe(
      ofType(todoAction.initialize),
      map(() => todoAction.getTodo())
    );
  },
  { functional: true }
);

export const getTodos = createEffect(
  () => {
    const _api = inject(TodoApi);
    return inject(Actions).pipe(
      ofType(todoAction.getTodo),
      switchMap(() => {
        return _api.getTodos().pipe(
          tap((v) => console.log(v)),
          map((todos: any) => todoAction.getTodoSuccess({ todos })),
          catchError(() => [todoAction.getTodoFail()])
        );
      })
    );
  },
  { functional: true }
);

export const addNewTodo = createEffect(
  () => {
    const _api = inject(TodoApi);
    return inject(Actions).pipe(
      ofType(todoAction.addNewTodo),
      switchMap(({todo}: any) => {
        return _api.post(todo).pipe(
          map(() => todoAction.addNewTodoSuccess({todo})),
          catchError(() => [todoAction.addNewTodoFail()])
        );
      })
    );
  },
  { functional: true }
);

export const toggleChecked = createEffect(
  () => {
    const _api = inject(TodoApi);
    return inject(Actions).pipe(
      ofType(todoAction.toggleChecked),
      switchMap(({id, checked}) => {
        return _api.patch(id, checked).pipe(
          tap((v) => console.log(v)),
          map(() => todoAction.toggleCheckedSuccess({id, checked})),
          catchError(() => [todoAction.toggleCheckedFail()])
        );
      })
    );
  },
  { functional: true }
)
