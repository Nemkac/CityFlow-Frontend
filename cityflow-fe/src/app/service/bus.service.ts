import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bus } from '../models/bus';
import { BusDTO } from '../dtos/busDTO';
import { AddRoutesToBusDTO } from '../dtos/addRoutesToBusDTO';
import { B, dt } from '@fullcalendar/core/internal-common';
import { EditBusDTO } from '../dtos/editBusDTO';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private apiServerUrl = 'http://13.60.27.75:8081'; 

  constructor(private http: HttpClient,
              private router: Router) { }

  public getHeaders() : HttpHeaders{
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`
    });
  }

  public getAll() : Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.apiServerUrl}/bus/get/all`, { headers : this.getHeaders() });
  }

  public save(bus : BusDTO) : Observable<Bus> {
    return this.http.post<Bus>(`${this.apiServerUrl}/bus/save`, bus, { headers : this.getHeaders() });
  }

  public deleteBus(id: number) : Observable<string>{
    return this.http.delete<string>(`${this.apiServerUrl}/bus/delete/${id}`, { headers : this.getHeaders(), responseType: "text" as "json"});
  }

  public addRoutesToBus(dto : AddRoutesToBusDTO) : Observable<string> {
    return this.http.post<string>(`${this.apiServerUrl}/bus/routes/add`, dto, { headers : this.getHeaders(), responseType: "text" as "json" });
  }

  public edit(dto : EditBusDTO) : Observable<Bus> {
    return this.http.post<Bus>(`${this.apiServerUrl}/bus/update`, dto, { headers : this.getHeaders(), responseType: "text" as "json"  });
  }
}
