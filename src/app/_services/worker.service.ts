import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/worker/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  constructor(private http: HttpClient) {}

  addWorker(worker: any): Observable<any> {
    console.log(worker);
    return this.http.post(
      API_URL + 'add',
      {
        name: worker.name,
        nickName: worker.nickName,
        telephone: worker.telephone,
      },
      httpOptions
    );
  }

  getWorkers(): Observable<any> {
    return this.http.get(API_URL + 'all', httpOptions);
  }

  deleteWorker(worker: any): Observable<any> {
    console.log(worker);
    return this.http.post(
      API_URL + 'delete',
      {
        name: worker.name,
        nickName: worker.nickName,
        telephone: worker.telephone,
      },
      httpOptions
    );
  }
}
