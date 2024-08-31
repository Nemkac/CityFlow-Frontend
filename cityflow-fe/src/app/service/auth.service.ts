import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../dtos/loginDTO';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { RegisterDTO } from '../dtos/registerDTO';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());
  public authStatus: Observable<boolean> = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient,
    private navigationService : NavigationService
  ) { }

  private apiServerUrl = 'http://localhost:8081'; 

  public logIn(logInDTO: LoginDTO):Observable<LoginDTO>{      
    return this.http.post<LoginDTO>(`${this.apiServerUrl}/CityFlow/Login`, logInDTO).pipe(
      tap(
        (response:LoginDTO) => {
          sessionStorage.setItem('token', response.username);
        }
      )
    )
  }

  public register(requestBody : RegisterDTO) : Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/CityFlow/RegisterUser`, requestBody);
  }

  public getUserFromToken(token: String): Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/CityFlow/getUserByToken?token=${token}`);
  }

  public isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  public signOut() : void {
    sessionStorage.removeItem('token');
    this.authStatusSubject.next(false);
    this.navigationService.navigateToSignIn();
  }
}
