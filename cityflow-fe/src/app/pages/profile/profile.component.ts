import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../service/user.service';
import { EditProfileDTO } from '../../dtos/editProfileDTO';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgClass, FormsModule, FontAwesomeModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  
  token = localStorage.getItem('token');
  loggedUser: User = { // Initialize the loggedUser object with default values
    id: 0,
    name: '',
    lastname: '',
    dateOfBirth: '',
    phoneNumber: '',
    username: '',
    email: '',
    password: '',
    roles :''
  };

  constructor(private authService : AuthService,
              private userService : UserService) {}

  ngOnInit(): void {
    this.fetchUser();
  }

  public editProfile(RegisterForm : NgForm) : void {
    if(this.token != null){
      this.userService.updateProfile(RegisterForm.value, this.loggedUser.id).subscribe(
        (response: string) => {
          //console.log(response);
          //console.log(RegisterForm.value);
          console.log(this.loggedUser.username);
        },
        (error : HttpErrorResponse) => {
          console.log("Error while updating profile:\n", error.message);
        }
      )
    }
    window.location.reload();
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
}
