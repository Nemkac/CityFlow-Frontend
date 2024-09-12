import { Component, OnInit } from '@angular/core';
import { NgToastModule, ToasterPosition } from 'ng-angular-popup'
import { NgToastService } from 'ng-angular-popup'; 
import { NgClass, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-super-admin',
  standalone: true,
  imports: [NgFor,FormsModule,NgClass,NgToastModule],
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent implements OnInit{

  users !: User[];

  constructor(private userService:UserService){}
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

}
