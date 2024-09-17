import { Component, OnInit } from '@angular/core';
import { NgToastModule, ToasterPosition } from 'ng-angular-popup'
import { NgToastService } from 'ng-angular-popup'; 
import { CommonModule, NgClass, NgFor, NgIf, NgSwitch } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TransPipePipe } from '../../trans-pipe.pipe';


@Component({
  selector: 'app-super-admin',
  standalone: true,
  imports: [NgFor,FormsModule,NgClass,NgToastModule,NgIf,NgSwitch,CommonModule,TransPipePipe],
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent implements OnInit{


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

  public displayRole(role:string):string {
    if(localStorage.getItem('lang') == 'eng'){
      if(role=='ROLE_DRIVER' ) return 'Driver';
      if(role=='ROLE_SERVICE' ) return 'Bus servicer';
      if(role=='ROLE_CHARGER' ) return 'Charging admin';
      else return 'No role';
    } else {
      if(role=='ROLE_DRIVER' ) return 'Возач';
      if(role=='ROLE_SERVICE' ) return 'Сервисер';
      if(role=='ROLE_CHARGER' ) return 'Админ пуњења';
      else return 'Без улоге';
    }
  }

  /*changeUserRoleVoid(user: any) {
    const currentIndex = user.roles;
    const nextIndex = (currentIndex + 1) % this.roles.length;
    user.roles = this.roles[nextIndex];
    switch(user.roles) {
      case 'ROLE_DRIVER' : {
        this.userService.changeRoleVoid(user.id,1);
        console.log("Driver : ",user.roles);
        break;
      }
      case 'ROLE_SERVICE' : {
        this.userService.changeRoleVoid(user.id,2);
        console.log("Servicer : ", user.roles);
        break;
      }
      case 'ROLE_CHARGER' : {
        this.userService.changeRoleVoid(user.id,3);
        console.log("Charger : ",user.roles);
        break;
      }
      case 'NO_ROLE' : {
        this.userService.changeRoleVoid(user.id,0);
        console.log("No role : ",user.roles);
        break;
      }
      default : {
        console.log("Default case")
      }
    }
  }*/

  changeUserRole(user: any) {
    const currentRole = user.roles;
    switch(currentRole) {
      case 'ROLE_DRIVER' : {
        user.roles = "ROLE_SERVICE";
        break;
      }
      case 'ROLE_SERVICE' : {
        user.roles = "ROLE_CHARGER";
        break;
      }
      case 'ROLE_CHARGER' : {
        user.roles = "NO_ROLE";
        break;
      }
      case 'NO_ROLE' : {
        user.roles = "ROLE_DRIVER";
        break;
      }
      default : {
        user.roles = "nema jbg";
      }
    }
    switch(user.roles) {
      case 'ROLE_DRIVER' : {
        this.userService.changeRole(user.id,1).subscribe(
          (response:User) => {
            console.log("Driver : ",response.roles);
          }
        )
        break;
      }
      case 'ROLE_SERVICE' : {
        this.userService.changeRole(user.id,2).subscribe(
          (response:User) => {
            console.log("Service : ",response.roles);
          }
        )
        break;
      }
      case 'ROLE_CHARGER' : {
        this.userService.changeRole(user.id,3).subscribe(
          (response:User) => {
            console.log("Charger : ",response.roles);
          }
        )
        break;
      }
      case 'NO_ROLE' : {
        this.userService.changeRole(user.id,0).subscribe(
          (response:User) => {
            console.log("No role : ",response.roles);
          }
        )
        break;
      }
      default : {
        console.log("Default case")
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
