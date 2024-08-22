import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '../dtos/userDTO';

import { Observable } from 'rxjs';
import { User } from '../models/user';
import { newUserDTO } from '../dtos/newUserDTO';
import { SalaryDTO } from '../dtos/salaryDTO';
import { EmploymentStatisticsDTO } from '../dtos/employmentStatisticsDTO';

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
  public searchUsersByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/CityFlow/searchByName?name=${encodeURIComponent(name)}`);
  }
  
  public searchUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/CityFlow/searchByRole?role=${encodeURIComponent(role)}`);
  }

  getUserDetails(userId: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiServerUrl}/CityFlow/getUserDetails/${userId}`);
  }
  getSalaryByUserId(userId: number): Observable<SalaryDTO> {
    return this.http.get<SalaryDTO>(`${this.apiServerUrl}/CityFlow/getSalaryByUserId/${userId}`);
  }
  public uploadProfilePicture(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiServerUrl}/CityFlow/uploadProfilePicture/${userId}`, formData, { responseType: 'text' });
  }

  public getUserProfilePicture(userId: number): Observable<string> {
    return this.http.get(`${this.apiServerUrl}/CityFlow/getUserProfilePicture/${userId}`, { responseType: 'text' });
  }
  getEmploymentStatistics(): Observable<EmploymentStatisticsDTO> {
    return this.http.get<EmploymentStatisticsDTO>(this.apiServerUrl + '/employmentStatistics');
}
  
  
}

