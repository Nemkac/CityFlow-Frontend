import { HttpClient } from '@angular/common/http';
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

  public getAll() : Observable<Route[]> {
    return this.http.get<Route[]>(`${this.apiServerUrl}/CityFlow/allRoutes`);
  }

  public getRoute(id : number) : Observable<Route>{
    return this.http.get<Route>(`${this.apiServerUrl}/CityFlow/route/${id}`);
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
    return this.http.get(`${this.apiServerUrl}/CityFlow/mostFrequented/${username}`, { responseType: 'text' });
  }

  public searchRoute(dto : SearchDTO) : Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/CityFlow/route/search`, dto)
  }

  public saveRoute(route: RouteDTO) : Observable<Route> {
    return this.http.post<Route>(`${this.apiServerUrl}/CityFlow/saveRoute`, route);
  }

  public deleteRoute(id: number) : Observable<any>{
    return this.http.delete<any>(`${this.apiServerUrl}/CityFlow/deleteRoute/${id}`);
  }

  public deleteBusFromRoute(dto: deleteBusFromRouteDTO) : Observable<any>{
    return this.http.put<any>(`${this.apiServerUrl}/CityFlow/deleteBusFromRoute`, dto);
  }

  // public getRouteWithAtLeastThreeStations() : Observable<String[]>{
  //   return this.http.get<String[]>(`${this.apiServerUrl}/CityFlow/atLeastThreeStations`)
  // }

  // public getLongestRoute() : Observable<String>{
  //   return this.http.get(`${this.apiServerUrl}/CityFlow/longest`, {responseType: 'text'})
  // }

  // public getStationsCount(routeName: String) : Observable<any>{
  //   return this.http.get<any>(`${this.apiServerUrl}/CityFlow/stationsCount/${routeName}`)
  // }

  public getAllStations() : Observable<Location[]>{
    return this.http.get<Location[]>(`${this.apiServerUrl}/CityFlow/getStations`);
  }
}
