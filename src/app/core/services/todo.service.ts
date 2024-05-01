import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '../models/todo.model';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getAllTodos(status: string): Observable<ITodo[]>{
    let queryString = '';
    if(status != ''){
      queryString = `status=${status}`
    }
    return this.http.get<ITodo[]>(`${apiEndpoint.TodoEndpoint.getAllTodos}?${queryString}`)
  }

  addTodo(data: ITodo): Observable<ITodo>{
    return this.http.post<ITodo>(`${apiEndpoint.TodoEndpoint.addTodo}`, data);
  }

  updateTodo(id: number, data: ITodo): Observable<ITodo>{
    return this.http.put<ITodo>(`${apiEndpoint.TodoEndpoint.updateTodo}/${id}`, data);
  }

}
