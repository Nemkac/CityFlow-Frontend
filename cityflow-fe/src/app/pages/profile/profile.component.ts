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
        return 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='; 
    }
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
