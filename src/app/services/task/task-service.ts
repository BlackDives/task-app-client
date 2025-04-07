import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JsonPatchOperation, NewTask, Task } from '../../interfaces/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);

  getUserTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`/api/task`);
  }

  addUserTask(newTask: NewTask): Observable<NewTask> {
    return this.http.post<NewTask>('/api/task', newTask);
  }

  deleteUserTask(taskId: string): Observable<unknown> {
    return this.http.delete(`/api/task/${taskId}`);
  }

  updateUserTask(
    id: string,
    operations: JsonPatchOperation[]
  ): Observable<void> {
    return this.http.patch<void>(`/api/task/${id}`, operations, {
      headers: { 'Content-type': 'application/json-patch+json' },
    });
  }
}
