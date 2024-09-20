import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Widget } from '../models/widget';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  // private apiServerUrl = 'http://13.60.27.75:8081'; 
  private apiServerUrl = 'http://localhost:8081'; 
  
  constructor(private http : HttpClient) { }

  private getHeaders() : HttpHeaders {
    const token = sessionStorage.getItem('token');
    const customHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`
    });

    return customHeaders;
  }

  public getAll() : Observable<Widget[]>{
    return this.http.get<Widget[]>(`${this.apiServerUrl}/widgets/get/all`, { headers : this.getHeaders() });
  }
}
