import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  constructor(private http: HttpClient) {}

  loginAdmin(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Admin/login-admin`, credentials);
  }
}
