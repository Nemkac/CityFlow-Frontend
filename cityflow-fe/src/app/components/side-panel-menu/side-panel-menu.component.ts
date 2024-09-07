import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHome, faIdCard, faInbox } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-panel-menu',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './side-panel-menu.component.html',
  styleUrl: './side-panel-menu.component.css'
})
export class SidePanelMenuComponent implements OnInit{
  //Icons
  faUser = faUser;
  faHome = faHome;
  faIdCard = faIdCard;
  faInbox = faInbox;

  //Menu item selections
  showHome : boolean = true;
  showProfile : boolean = false;
  showCards : boolean = false;
  showInbox : boolean = false;
  showRoutes : boolean = false;
  showEmployees: boolean = false;

  token : string | null = localStorage.getItem('token');
  loggedUser! : User;
  loggedUserRole : string  = '';

  constructor(private authService : AuthService,
              private router: Router){}

  ngOnInit(): void {
    this.fetchUser();
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

  public viewHome() : void{
    this.showHome = true;
    this.showProfile = false;
    this.showCards = false;
    this.showInbox = false;
    this.showRoutes = false;
    this.showEmployees = false;
  }
  
  public viewProfile() : void{
    this.showHome = false;
    this.showProfile = true;
    this.showCards = false;
    this.showInbox = false;
    this.showRoutes = false;
    this.showEmployees = false;
    this.navigateToProfile();
  }

  public viewCards() : void{
    this.showHome = false;
    this.showProfile = false;
    this.showCards = true;
    this.showInbox = false;
  }
  
  public viewInbox() : void{
    this.showHome = false;
    this.showProfile = false;
    this.showCards = false;
    this.showInbox = true;
    this.showRoutes = false;
    this.showEmployees = false;
  }

  public viewRoutes() : void{
    this.showHome = false;
    this.showProfile = false;
    this.showRoutes = true;
    this.showInbox = false;
    this.navigateToRoutes();
  }

  public viewEmployees() : void{
    this.showHome = false;
    this.showProfile = false;
    this.showEmployees = true;
    this.showInbox = false;
    this.navigateToEmployees();
  }

  public navigateToRoutes() : void {
    this.router.navigate(['/routes']);
  }

  public navigateToEmployees() : void {
    this.router.navigate(['/employees']);
  }

  public navigateToProfile() : void {
    this.router.navigate(['/profile']);
  }
}
