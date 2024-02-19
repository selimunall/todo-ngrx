import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TodoInterface } from './reducer';

export const todoAction = createActionGroup({
 source: 'Todos',
 events: {
  'Initialize': emptyProps(),

  'Get Todo': emptyProps(),
  'Get Todo Success': props<{ todos: any[] }>(),
  'Get Todo Fail': emptyProps(),

  'Add New Todo': props<{todo: any}>(),
  'Add New Todo Success': props<{todo: any}>(),
  'Add New Todo Fail': emptyProps(),

  'Toggle Checked': props<{id: number, checked: boolean}>(),
  'Toggle Checked Success': props<{id: number, checked: boolean}>(),
  'Toggle Checked Fail': emptyProps(),
  
 }
});