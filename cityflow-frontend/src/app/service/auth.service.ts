import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../dtos/loginDTO';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { RegisterDTO } from '../dtos/registerDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiServerUrl = 'http://localhost:8081'; 

  public logIn(logInDTO: LoginDTO):Observable<LoginDTO>{      
    return this.http.post<LoginDTO>(`${this.apiServerUrl}/CityFlow/Login`, logInDTO).pipe(
      tap(
        (response:LoginDTO) => {
          localStorage.setItem('token', response.username);
        }
      )
    )
  }

  public register(requestBody:RegisterDTO):Observable<RegisterDTO>{
    return this.http.post<RegisterDTO>(`${this.apiServerUrl}/CityFlow/RegisterUser`, requestBody);
  }
}
