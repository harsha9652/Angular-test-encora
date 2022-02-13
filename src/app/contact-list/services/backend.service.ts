import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(public http: HttpClient) { }

  GetContacts<Contact>(urlKey, params?, options = {}): Observable<Contact> {
    options = { ...options, params: params || {} };
    return this.http.get<Contact>(urlKey, options);
  }
}
