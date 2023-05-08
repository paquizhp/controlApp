import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

const API_URL = 'http://localhost:8080/api/pay';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class PayService {
  constructor(private http: HttpClient) {}

  pay(payDetail: any): Observable<any> {
    const dataFilter = {
      worker: payDetail.id,
      job: payDetail.job,
      date: payDetail.date,
      price: payDetail.price,
    };
    console.log(dataFilter);
    return this.http.post(API_URL, dataFilter, httpOptions);
  }
  getCurrentWeek(id: String, firstDayOfWeek: String, lastDayOfWeek: String) {
    const dataFilter = {
      worker: id,
      firstDay: firstDayOfWeek,
      lastDay: lastDayOfWeek,
    };
    return this.http.post(API_URL + '/week', dataFilter, httpOptions);
  }
}
