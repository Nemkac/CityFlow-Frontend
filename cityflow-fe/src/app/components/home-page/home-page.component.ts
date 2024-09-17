import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { TransPipePipe } from '../../trans-pipe.pipe';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgIf,TransPipePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{

  token : string | null = localStorage.getItem('token');
  loggedUser! : User;
  loggedUserRole : string  = '';

  constructor(private authService : AuthService){}

  ngOnInit(): void {
    this.fetchUser();
    if(sessionStorage.getItem('keyDriver') == '0') {
      window.location.reload();
      sessionStorage.setItem('keyDriver','1');
    }
    if(sessionStorage.getItem('keyCharger') == '0') {
      window.location.reload();
      sessionStorage.setItem('keyCharger','1');
    }
    if(sessionStorage.getItem('keyServicer') == '0') {
      window.location.reload();
      sessionStorage.setItem('keyServicer','1');
    }
    if(sessionStorage.getItem('keyNoRole') == '0') {
      window.location.reload();
      sessionStorage.setItem('keyNoRole','1');
    }
    if(sessionStorage.getItem('keySuperAdmin') == '0') {
      window.location.reload();
      sessionStorage.setItem('keySuperAdmin','1');
    }
  }

    public fetchUser() : void {
      if(this.token != null){
        this.authService.getUserFromToken(this.token).subscribe(
          (response : User) => {
            this.loggedUser = response;
            this.loggedUserRole = this.loggedUser.roles;
          },
          (error: HttpErrorResponse) => {
            console.log('Error fetching user data:\n', error.message);
          }
        )
      }
    }
  

}
