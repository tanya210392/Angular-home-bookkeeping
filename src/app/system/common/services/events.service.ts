import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseApi } from '../../../common/core/base-api';
import { BEvent } from '../models/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  AddEvent(event: BEvent): Observable<BEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<BEvent[]> {
    return this.get('events');
  }
}
