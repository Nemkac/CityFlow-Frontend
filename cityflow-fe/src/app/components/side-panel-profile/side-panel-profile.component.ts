import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-side-panel-profile',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './side-panel-profile.component.html',
  styleUrl: './side-panel-profile.component.css'
})
export class SidePanelProfileComponent implements OnInit{
  //Icons
  faSignOut = faSignOut;
  loggedUser! : User;
  token = localStorage.getItem('token');

  constructor(private authService : AuthService){}

  ngOnInit(): void {
    this.fetchUser();
  }

  public fetchUser() : void {
    if(this.token != null){
      this.authService.getUserFromToken(this.token).subscribe(
        (response : User) => {
          this.loggedUser = response;
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
