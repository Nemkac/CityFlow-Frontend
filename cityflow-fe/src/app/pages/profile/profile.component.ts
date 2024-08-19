import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../service/user.service';
import { EditProfileDTO } from '../../dtos/editProfileDTO';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgClass, FormsModule, FontAwesomeModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  
  token = localStorage.getItem('token');
  loggedUser! : User;

  public toggleEditPersonal : boolean = false;
  public toggleEditAddress : boolean = false;
  public toggleEditAccount : boolean = false;

  public firstname : string = '';
  public lastname : string = '';
  public dateOfBirth : string = '';
  public phoneNumber : string = '';
  public username : string = '';
  public email : string = '';
  public password : string = '';


  constructor(private authService : AuthService,
              private toast : NgToastService,
              private userService : UserService) {}

  ngOnInit(): void {
    this.fetchUser();
  }

  public fetchUser() : void {
    if(this.token != null){
      this.authService.getUserFromToken(this.token).subscribe(
        (response : User) => {
          this.loggedUser = response;
          console.log(this.loggedUser);
          this.firstname = this.loggedUser.name;
          this.lastname = this.loggedUser.lastname;
          this.dateOfBirth = this.loggedUser.dateOfBirth;
          this.phoneNumber = this.loggedUser.phoneNumber;
          this.username = this.loggedUser.username;
          this.email = this.loggedUser.email;
          this.password = this.loggedUser.password;
        },
        (error: HttpErrorResponse) => {
          console.log('Error fetching user data:\n', error.message);
        }
      )
    }
  }

  public saveChanges() : void{
    const updateDto : EditProfileDTO = {
      username : this.username,
      name : this.firstname,
      lastname : this.lastname,
      email : this.email,
      password : this.password,
      dateOfBirth : this.dateOfBirth,
      phoneNumber : this.phoneNumber 
    }

    console.log("Updated data: ", updateDto);
    console.log("Current original data: ", this.loggedUser)

    this.userService.updateProfile(updateDto).subscribe(
      (response: any) => {
        console.log(response);
        this.fetchUser();
        this.toast.success({detail:"SUCCESS",summary:'Profile data successfully updated!', duration:3000});        
        this.toggleEditAccount = false;
        this.toggleEditAddress = false;
        this.toggleEditPersonal = false;
      },
      (error : HttpErrorResponse) => {
        console.log("Error while updating profile:\n", error.message);
      }
    )
  }

  public toggleEditing(section : string) {
    if(section === "personal"){
      this.toggleEditPersonal = !this.toggleEditPersonal;
    } 
    if(section === "address"){
      this.toggleEditAddress = !this.toggleEditAddress;
    }
    if(section === "account"){
      this.toggleEditAccount = !this.toggleEditAccount;
    }
  }
}
