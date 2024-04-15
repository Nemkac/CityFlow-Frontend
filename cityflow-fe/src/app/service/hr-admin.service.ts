import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '../dtos/userDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrAdminService {
  private apiServerUrl = 'http://localhost:8081'; 

  constructor(private http: HttpClient,
              private router: Router) { }

  public register(requestBody:UserDTO):Observable<UserDTO>{
    return this.http.post<UserDTO>(`${this.apiServerUrl}/CityFlow/RegisterUser`, requestBody);
  }
}
