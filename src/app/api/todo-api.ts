import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class TodoApi {
    private _http = inject(HttpClient);
    public path = 'http://localhost:8000/todos'
    
    public getTodos(): Observable<any> {
       return this._http.get(this.path);
    }

    public post(todo: any): Observable<any> {
        return this._http.post(this.path,todo);
    }

    public patch(id: any, checked: boolean) {
        return this._http.patch(`${this.path}/${id}`,{checked: checked})
    }
}