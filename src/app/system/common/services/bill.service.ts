import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill';
import { BaseApi } from '../../../common/core/base-api';

@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  getCurrency(): Observable<any> {
    return this.http.get(`http://data.fixer.io/api/latest?access_key=c1c37caab5a79c0ffa5c844dc833c6f9&symbols=USD`);
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }

}
