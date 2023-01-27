import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private base_url = baseUrl.server;
  private httpOptions = {
    headers: {
      Authorization: `Bearer ${this.authService.getJwtToken()}`
    }
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  postData(endpoint: any, data: any): Observable<any[]> {
    return this.http.post<any[]>(this.base_url + endpoint, data);
  }

  getSingleNoAuth(endpoint: any) {
    return this.http.get(this.base_url + endpoint).pipe(retry(1));
  }

  getSingleNoAuthID(endpoint: any, id: any) {
    return this.http.get(this.base_url + endpoint + id).pipe(retry(1));
  }

  getAuthSingle(endpoint: any): Observable<any[]> {
    return this.http
      .get<any[]>(this.base_url + endpoint, this.httpOptions)
      .pipe(retry(2));
  }

  getAuthSingleID(endpoint: any, id: any): Observable<any[]> {
    return this.http
      .get<any[]>(this.base_url + endpoint + id, this.httpOptions)
      .pipe(retry(2));
  }

  updateData(endpoint: any, data: any, id: any): Observable<any[]> {
    return this.http
      .put<any[]>(this.base_url + endpoint + id, data, this.httpOptions)
      .pipe(retry(2));
  }

  deleteData(endpoint: any, id: any): Observable<any[]> {
    return this.http
      .delete<any[]>(this.base_url + endpoint + id, this.httpOptions)
      .pipe(retry(2));
  }
}
