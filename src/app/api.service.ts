import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json'; // API URL

  constructor(private http: HttpClient) { }

  getBitcoinPrice(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
