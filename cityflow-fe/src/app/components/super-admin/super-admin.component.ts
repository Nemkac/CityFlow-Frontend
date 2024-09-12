import { Component, OnInit } from '@angular/core';
import { NgToastModule, ToasterPosition } from 'ng-angular-popup'
import { NgToastService } from 'ng-angular-popup'; 
import { CommonModule, NgClass, NgFor, NgIf, NgSwitch } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-super-admin',
  standalone: true,
  imports: [NgFor,FormsModule,NgClass,NgToastModule,NgIf,NgSwitch,CommonModule],
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent implements OnInit{

  roles = ['Driver', 'Servicer', 'Charging admin', 'No role'];

  users !: User[];
  loggedUserRole : string  = '';
  token : string | null = localStorage.getItem('token');
  loggedUser! : User;



  constructor(private userService:UserService,
              private authService : AuthService
  ){}
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getAllUsersNoAdmin().subscribe(
      (foundUsers) => {
        this.users = foundUsers;
      }
    )
  }

  public fetchUser() : void {
    if(this.token != null){
      this.authService.getUserFromToken(this.token).subscribe(
        (response : User) => {
          this.loggedUser = response;
          this.loggedUserRole = this.loggedUser.roles;
          //console.log(this.loggedUserRole);
        },
        (error: HttpErrorResponse) => {
          console.log('Error fetching user data:\n', error.message);
        }
      )
    }
  }

  changeUserRoleVoid(user: any) {
    const currentIndex = this.roles.indexOf(user.roles);
    const nextIndex = (currentIndex + 1) % this.roles.length;
    user.roles = this.roles[nextIndex];
    switch(this.roles[nextIndex]) {
      case 'Driver' : {
        this.userService.changeRoleVoid(user.id,1);
        console.log("Driver : ",user.roles);
        console.log(user.id,1);
        break;
      }
      case 'Servicer' : {
        this.userService.changeRoleVoid(user.id,2);
        console.log("Servicer : ", user.roles);
        console.log(user.id,2);
        break;
      }
      case 'Charging admin' : {
        this.userService.changeRoleVoid(user.id,3);
        console.log("Charger : ",user.roles);
        console.log(user.id,3);
        break;
      }
      case 'No role' : {
        this.userService.changeRoleVoid(user.id,0);
        console.log("No role : ",user.roles);
        console.log(user.id,4);
        break;
      }
    }
  }

  changeUserRole(user: any) {
    const currentIndex = this.roles.indexOf(user.roles);
    const nextIndex = (currentIndex + 1) % this.roles.length;
    user.roles = this.roles[nextIndex];
    switch(this.roles[nextIndex]) {
      case 'Driver' : {
        this.userService.changeRole(user.id,1).subscribe(
          (response:User) => {
            console.log("Ajmo vako sad ", response.id);
          }
        )
        console.log("Driver : ",user.roles);
        console.log(user.id,1);
        break;
      }
      case 'Servicer' : {
        this.userService.changeRole(user.id,2).subscribe(
          (response:User) => {
            console.log("Ajmo vako sad ", response.id);
          }
        )
        console.log("Servicer : ", user.roles);
        console.log(user.id,2);
        break;
      }
      case 'Charging admin' : {
        this.userService.changeRole(user.id,3).subscribe(
          (response:User) => {
            console.log("Ajmo vako sad ", response.id);
          }
        )
        console.log("Charger : ",user.roles);
        console.log(user.id,3);
        break;
      }
      case 'No role' : {
        this.userService.changeRole(user.id,0).subscribe(
          (response:User) => {
            console.log("Ajmo vako sad ", response.id);
          }
        )
        console.log("No role : ",user.roles);
        console.log(user.id,4);
        break;
      }
    }
  }

  getRoleText(role: string): string {
    if (role === 'ROLE_DRIVER') return 'Driver';
    if (role === 'ROLE_CHARGER') return 'Charging admin';
    if (role === 'ROLE_SERVICE') return 'Servicer';
    if (role === 'NO_ROLE') return 'No role';
    return 'Unknown';
  }
  

  

}
