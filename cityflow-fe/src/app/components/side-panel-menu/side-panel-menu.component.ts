import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHome, faIdCard, faInbox, faBus } from '@fortawesome/free-solid-svg-icons';
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
  faBus = faBus;

  //Menu item selections
  showHome : boolean = true;
  showProfile : boolean = false;
  showCards : boolean = false;
  showInbox : boolean = false;
  showRoutes : boolean = false;
  showBuses : boolean = false;
  showEmployees: boolean = false;
  showUserBalance: boolean = false;
  showUserCardBalance: boolean = false;
  showRequests : boolean = false;
  showReports : boolean = false;

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
    this.showUserBalance = false;
    this.showUserCardBalance = false;
    this.showRequests = false;
    this.showBuses = false;
    this.showReports = false;
  }
  
  public viewProfile() : void{
    this.showHome = false;
    this.showProfile = true;
    this.showCards = false;
    this.showInbox = false;
    this.showRoutes = false;
    this.showEmployees = false;
    this.showUserBalance = false;
    this.showUserCardBalance = false;
    this.showRequests = false;
    this.showBuses = false;
    this.showReports = false;
    this.navigateToProfile();
  
  }

  public viewCards() : void{
    this.showHome = false;
    this.showProfile = false;
    this.showCards = true;
    this.showInbox = false;
    this.showReports = false;
    this.navigateToCards();
  }
  
  public viewInbox() : void{
    this.showHome = false;
    this.showProfile = false;
    this.showCards = false;
    this.showInbox = true;
    this.showRoutes = false;
    this.showEmployees = false;
    this.showUserBalance = false;
    this.showUserCardBalance = false;
    this.showRequests = false;
    this.showBuses = false;
    this.showReports = false;
  }

  public viewRoutes() : void{
    this.showHome = false;
    this.showProfile = false;
    this.showRoutes = true;
    this.showInbox = false;
    this.showBuses = false;
    this.showReports = false;
    this.navigateToRoutes();
  }

  public viewBuses() : void{
    this.showHome = false;
    this.showProfile = false;
    this.showRoutes = false;
    this.showInbox = false;
    this.showBuses = true;
    this.showReports = false;
    this.navigateToBuses();
  }

  public viewEmployees() : void{
    this.showHome = false;
    this.showProfile = false;
    this.showEmployees = true;
    this.showInbox = false;
    this.showReports = false;
    this.navigateToEmployees();
  }
  public viewUserBalance() : void{
    this.showHome = false;
    this.showProfile = false;
    this.showInbox = false;
    this.showUserBalance = true;
    this.showUserCardBalance = false;
    this.showRequests = false;
    this.showReports = false;
    this.navigateToEmployees();
  }
  public viewUserRequests() : void{
    this.showHome = false;
    this.showProfile = false;
    this.showInbox = false;
    this.showUserBalance = false;
    this.showUserCardBalance = false;
    this.showRequests = true;
    this.showReports = false;
    this.navigateToEmployees();
  }
  public viewUserCardBalance() : void{
    this.showHome = false;
    this.showProfile = false;
    this.showInbox = false;
    this.showUserBalance = false;
    this.showUserCardBalance = true;
    this.showReports = false;
    this.navigateToUserCardBalance();
  }
  public viewReports() : void{
    this.showHome = false;
    this.showProfile = false;
    this.showInbox = false;
    this.showUserBalance = false;
    this.showUserCardBalance = true;
    this.showReports = true;
    this.navigateToReports();
  }

 

  public navigateToRoutes() : void {
    this.router.navigate(['/routes']);
  }
  public navigateToReports() : void {
    this.router.navigate(['/reports']);
  }

  public navigateToEmployees() : void {
    this.router.navigate(['/employees']);
  }

  public navigateToProfile() : void {
    this.router.navigate(['/profile']);
  }
  public navigateToUserBalance() : void {
    this.router.navigate(['/updateUserBalance']);
  }

  public navigateToUserCardBalance() : void {
    this.router.navigate(['/updateUserCardBalance']);
  }
  public navigateToDocumentRequests() : void {
    this.router.navigate(['/documentRequests']);
  }
  public navigateToBuses() : void {
    this.router.navigate(['/buses']);
  }
  public navigateToCards() : void {
    this.router.navigate(['/fileUpload']);
  }
}
