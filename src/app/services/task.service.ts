import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  throwError,
  Observable,
  retry,
  catchError,
} from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: BehaviorSubject<Task[]>;
  options: {};
  mainUrl = 'https://670ecaf43e7151861655cbab.mockapi.io/tasks/tasks/';
  constructor(private http: HttpClient) {
    this.tasks = new BehaviorSubject<Task[]>([]);
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  getAllTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.mainUrl)
      .pipe(retry(3), catchError(this.handleError));
  }

  getSingleTask(id: string): Observable<Task> {
    return this.http
      .get<Task>(`${this.mainUrl}${id}`)
      .pipe(retry(3), catchError(this.handleError));
  }
  updateTask(id: string, task: {}) {
    return this.http
      .put(this.mainUrl + id, task, this.options)
      .pipe(retry(3), catchError(this.handleError));
  }
}
