import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { SigninSignupComponent } from '../signin-signup/signin-signup.component';

@Component({
  selector: 'app-side-panel-profile',
  standalone: true,
  imports: [FontAwesomeModule, SigninSignupComponent],
  templateUrl: './side-panel-profile.component.html',
  styleUrl: './side-panel-profile.component.css'
})
export class SidePanelProfileComponent implements OnInit{
  //Icons
  faSignOut = faSignOut;
  loggedUser! : User;
  token = localStorage.getItem('token');
  public role : string = '';
  isLoggedIn: boolean = false;


  constructor(private authService : AuthService){}

  ngOnInit(): void {
    this.isUserLogged();
    this.fetchUser();
  }

  public isUserLogged() : void {
    this.isLoggedIn = this.authService.isLoggedIn();
    
    window.addEventListener('storage', (event) => {
      if (event.key === 'token') {
        this.isLoggedIn = !!localStorage.getItem('token');
      }
    });
  }

  public fetchUser() : void {
    if(this.token != null){
      this.authService.getUserFromToken(this.token).subscribe(
        (response : User) => {
          this.loggedUser = response;
          this.role = this.loggedUser.roles.split('_')[1];
        },
        (error: HttpErrorResponse) => {
          console.log('Error fetching user data:\n', error.message);
        }
      )
    }
  }

  public signOut() : void {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
