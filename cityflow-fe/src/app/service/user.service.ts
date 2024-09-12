import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EditProfileDTO } from '../dtos/editProfileDTO';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = 'http://localhost:8081'; 

  constructor(private http: HttpClient,
              private router: Router) { }
  
  public updateProfile(requestBody : User, id: number) : Observable<string>{
    return this.http.put<string>(`${this.apiServerUrl}/CityFlow/updateProfile/${id}`, requestBody);  
  }

  public getAllUsersNoAdmin():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}/CityFlow/getAllUsersNoAdmin`);
  }

  public changeRoleVoid(userId:number, newRole:number):void{
    this.http.get<void>(`${this.apiServerUrl}/CityFlow/changeRoleVoid/${userId}/${newRole}`);
  }
  
  public changeRole(userId:number, newRole:number):Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/CityFlow/changeRole/${userId}/${newRole}`);
  }
  
}
