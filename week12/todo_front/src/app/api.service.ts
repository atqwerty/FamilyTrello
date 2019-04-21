import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://localhost:8000/api";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  createTaskList(name: string): Observable<any>{
    const httpOptions = {
      headers: this.httpHeaders
    };
    return this.http.post(this.baseurl + "/new_task_list/", JSON.stringify(name), httpOptions);
  }

  getAllTaskLists(): Observable<any>{
    return this.http.get(this.baseurl + "/task_lists/", { headers : this.httpHeaders });
  }

  getTaskList(id: string): Observable<any>{
    return this.http.get(this.baseurl + "/task_lists/" + id);
  }

  getTasks(id: string): Observable<any>{
    return this.http.get(this.baseurl + "/task_lists/" + id + "/tasks");
  }

  getTaskInfo(task_list_id: string, task_id: string): Observable<any>{
    return this.http.get(this.baseurl + "/task_lists/" + task_list_id + "/tasks/" + task_id);
  }
}