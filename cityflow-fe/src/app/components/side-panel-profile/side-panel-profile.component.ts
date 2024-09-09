import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-side-panel-profile',
  standalone: true,
  imports: [FontAwesomeModule,NgIf],
  templateUrl: './side-panel-profile.component.html',
  styleUrl: './side-panel-profile.component.css'
})
export class SidePanelProfileComponent implements OnInit{
  //Icons
  faSignOut = faSignOut;
  loggedUser! : User;
  token = localStorage.getItem('token');

  constructor(private authService : AuthService,
              private router : Router
  ){}

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

  public getAvatarUrl(): string {
    if (!this.loggedUser) return '';

    switch (this.loggedUser.roles) {
      case 'ROLE_DRIVER':
        return 'https://img.freepik.com/free-photo/man-working-as-truck-driver-posing_23-2151489877.jpg';
      case 'ROLE_SERVICE':
        return 'https://media.istockphoto.com/id/824981586/photo/portrait-of-a-mechanic-fixing-cars-at-an-auto-repair-shop.jpg?s=612x612&w=0&k=20&c=0yln2fLED8K9rskg6MjHjUCkv5cfh5IrYsjrYJq6Ezg=';
      case 'ROLE_CHARGER':
        return 'https://t3.ftcdn.net/jpg/03/67/46/48/240_F_367464887_f0w1JrL8PddfuH3P2jSPlIGjKU2BI0rn.jpg';
      default:
        return 'default-image-url.jpg'; // Provide a default image URL if needed
    }
  }

  public signOut() : void {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
    this.token = null;
    //window.location.reload();
    if(this.token != null){
      this.authService.getUserFromToken(this.token).subscribe(
        (response : User) => {
          this.loggedUser = response;
          console.log(this.token);
        },
        (error: HttpErrorResponse) => {
          console.log('Error fetching user data:\n', error.message);
        }
      )
    } else {
      console.log("nema lika");
    }

  }
}
