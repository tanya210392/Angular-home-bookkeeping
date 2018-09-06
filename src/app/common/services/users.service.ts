import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { BaseApi } from '../core/base-api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`).pipe(
      map((user: User[]) => user[0] ? user[0] : undefined)
    );
  }

  createNewUser(user: User): Observable<User> {
    return this.post('users', user);
  }
}
