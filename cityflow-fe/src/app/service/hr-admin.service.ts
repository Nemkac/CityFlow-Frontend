import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '../dtos/userDTO';

import { Observable } from 'rxjs';
import { User } from '../models/user';
import { newUserDTO } from '../dtos/newUserDTO';
import { SalaryDTO } from '../dtos/salaryDTO';
import { FinancialReport } from '../models/financial-report';

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

  public addUser(requestBody: newUserDTO): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/CityFlow/addUser`, requestBody);
  }
  deleteUser(userId: number, reason: string): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/CityFlow/deleteUser/${userId}`, reason);
  }
  public updateUser(userId: number, userDTO: UserDTO): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/CityFlow/updateUser/${userId}`, userDTO);
  }

  assignSalary(userId: number, salaryDTO: SalaryDTO): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/CityFlow/assignSalary/${userId}`, salaryDTO);
  }
  getAggregatedFinancialReport(): Observable<FinancialReport> {
    return this.http.get<FinancialReport>(`${this.apiServerUrl}/CityFlow/financialReports`);
  }

}
