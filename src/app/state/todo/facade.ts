import { makeEnvironmentProviders, Injectable, inject } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { createSelector, provideState, select, Store } from '@ngrx/store';
import { AppStateInterface, TodosStateInterface, adapter, todoFeature, todoSelector } from './reducer';
import * as todoEffects from './effects';
import { todoAction } from './actions';
import { toSignal } from '@angular/core/rxjs-interop'
export const provideTodoState = () =>
  makeEnvironmentProviders([
    TodoStateService,
    provideState(todoFeature),
    provideEffects(todoEffects),
  ]);

@Injectable()
export class TodoStateService {
  private readonly _store = inject(Store<AppStateInterface>);
  public todo =  this._store.selectSignal(todoSelector);
  public initialize(): void {
    this._store.dispatch(todoAction.initialize());
  }

  public addNewTodo(todo: any): void {
    this._store.dispatch(todoAction.addNewTodo({todo}));
  }

  public toggleChecked(id: any, checked: boolean): void {
    this._store.dispatch(todoAction.toggleChecked({id,checked}))
  }
}
