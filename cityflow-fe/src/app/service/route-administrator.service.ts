import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteAdministrator } from '../models/routeAdministrator';
import { Widget } from '../models/widget';

@Injectable({
  providedIn: 'root'
})
export class RouteAdministratorService {

  private apiServerUrl = 'http://localhost:8081'; 

  constructor(private http : HttpClient) { }
  
  public getHeaders() : HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`
    });
  }

  public getByUser() : Observable<RouteAdministrator> {
    return this.http.get<RouteAdministrator>(`${this.apiServerUrl}/routeAdministrator/get/byUser`, { headers : this.getHeaders()});
  }

  public getAdminWidgets() : Observable<Widget[]> {
    return this.http.get<Widget[]>(`${this.apiServerUrl}/routeAdministrator/widget/get/all`, { headers : this.getHeaders()});
  }

  public addWidgetsToDashboard(selectedWidgets : Widget[]) : Observable<string> {
    return this.http.post<string>(`${this.apiServerUrl}/routeAdministrator/widget/add`, selectedWidgets, { headers : this.getHeaders(),  responseType: "text" as "json"  });
  } 

  public removeWidgetFromDashboard(selectedWidget : Widget) : Observable<string> {
    return this.http.post<string>(`${this.apiServerUrl}/routeAdministrator/widget/remove`, selectedWidget, { headers : this.getHeaders(), responseType: "text" as "json" });
  }
}
