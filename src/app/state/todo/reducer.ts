import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { todoAction } from './actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';



// export interface TodosState   {
    //   todos: any[];
    // }

export const adapter: EntityAdapter<TodoInterface> = createEntityAdapter<TodoInterface>();


export interface TodoInterface{
    id: number,
    todo: string,
    checked: boolean
}

export interface TodosStateInterface extends EntityState<TodoInterface> {
    loading: boolean;
}

const initialState: TodosStateInterface = adapter.getInitialState({
  todos: [],
  loading: false
});

export const todoFeature = createFeature({
  name: 'todos',
  reducer: createReducer(
    initialState,
    on(todoAction.getTodo, (state): TodosStateInterface => ({ ...state })),
    on(
      todoAction.getTodoSuccess,
      (state, actions): TodosStateInterface => {
        return adapter.setAll(actions.todos, {...state,loading: false});
      }
    ),
    on(todoAction.getTodoFail, (state): TodosStateInterface => ({ ...state })),
    on(todoAction.addNewTodo, (state): TodosStateInterface => ({ ...state })),
    on(
      todoAction.addNewTodoSuccess,
      (state, actions): TodosStateInterface => adapter.addOne(actions.todo , {...state})
    ),
    on(todoAction.addNewTodoFail, (state): TodosStateInterface => ({ ...state })),
    on(todoAction.toggleChecked, (state): TodosStateInterface => ({ ...state })),
    on(todoAction.toggleCheckedSuccess, (state, {id,checked}): TodosStateInterface => adapter.updateOne({id: id, changes: {checked: checked}},{...state})),
    // on(todoAction.toggleCheckedFail, (state): TodosStateInterface => ({ ...state }))
  )
});

export const selectFeature = (state: AppStateInterface) => state.todos;

export const todoSelector = createSelector(
  selectFeature,
  adapter.getSelectors().selectAll
);


export interface AppStateInterface {
  todos: TodosStateInterface
}