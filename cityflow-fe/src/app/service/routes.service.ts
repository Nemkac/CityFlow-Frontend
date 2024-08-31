import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '../models/route';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RouteDTO } from '../dtos/routeDTO';
import { deleteBusFromRouteDTO } from '../dtos/deleteBusFromRouteDTO';
import { SearchDTO } from '../dtos/searchDTO';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  private apiServerUrl = 'http://localhost:8081'; 

  constructor(private http: HttpClient,
              private router: Router) { }

  public getHeaders() : HttpHeaders{
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`
    });
  }

  public getAll() : Observable<Route[]> {
    return this.http.get<Route[]>(`${this.apiServerUrl}/route/get/all`, { headers : this.getHeaders() });
  }

  public getById(id : number) : Observable<Route>{
    return this.http.get<Route>(`${this.apiServerUrl}/route/get/${id}`, { headers : this.getHeaders() });
  }

  public showRoute(id: number, username: string, routename: string) : void{
    const dto : SearchDTO = {
      username : username,
      routename : routename
    }
    this.searchRoute(dto).subscribe();
    this.router.navigate([`/route/${id}`]);
  }

  public getMostFrequentedRoute(username : String) : Observable<String> {
    return this.http.get(`${this.apiServerUrl}/route/mostFrequented/${username}`, { responseType: 'text' });
  }

  public searchRoute(dto : SearchDTO) : Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/route/route/search`, dto)
  }

  public saveRoute(route: RouteDTO) : Observable<Route> {
    return this.http.post<Route>(`${this.apiServerUrl}/route/save`, route, { headers : this.getHeaders() });
  }

  public deleteRoute(id: number) : Observable<any>{
    return this.http.delete<any>(`${this.apiServerUrl}/route/deleteRoute/${id}`, { headers : this.getHeaders() });
  }

  public deleteBusFromRoute(dto: deleteBusFromRouteDTO) : Observable<any>{
    return this.http.put<any>(`${this.apiServerUrl}/route/deleteBusFromRoute`, dto, { headers : this.getHeaders() });
  }

  public getAllStations() : Observable<Location[]>{
    return this.http.get<Location[]>(`${this.apiServerUrl}/route/stations/get/all`, { headers : this.getHeaders() });
  }

  public saveStation(body : Location) : Observable<Location>{
    return this.http.post<Location>(`${this.apiServerUrl}/route/station/save`, body, { headers : this.getHeaders() });
  }
}
