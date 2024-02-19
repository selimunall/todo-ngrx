import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodoStateService } from '../app/state/index';
import { TodoApi } from './api/todo-api';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  providers: [TodoStateService, TodoApi],
})
export class AppComponent {
  title = 'Selimin Todo';
  public state = inject(TodoStateService);
  private _fb = inject(FormBuilder);


  public showChecked = signal(false);
  public form = this._fb.group({
    id: [null],
    checked: [false],
    todo: [null, Validators.required],
  });

  public todos = computed(() => {
    if(this.showChecked()) {
      return this.state.todo().filter((m) => !m.checked)
    }
    return this.state.todo();
  })

  constructor() {
    this.state.initialize();
    effect(() => {
      console.log(this.state.todo())
    })
  }

  public addTodo() {
    this.state.addNewTodo({ ...this.form.value, id: this.uniqeId() });
    this.form.reset()
  }

  public uniqeId() {
    // return this.state.todos()?.length + 2;
  }

  public toggleChecked(id: number, checked: boolean) {
    this.state.toggleChecked(id,checked);
  }
}
