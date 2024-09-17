import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faCircleExclamation, faIdCard, faInbox,faScrewdriverWrench,faPlug, faStairs, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { TransPipePipe } from '../../trans-pipe.pipe';

@Component({
  selector: 'app-side-panel-menu',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, NgIf,TransPipePipe],
  templateUrl: './side-panel-menu.component.html',
  styleUrl: './side-panel-menu.component.css'
})
export class SidePanelMenuComponent implements OnInit{
  //Icons
  faUser = faUser;
  faExclamation = faCircleExclamation;
  faIdCard = faIdCard;
  faInbox = faInbox;
  faScrewdriverWrench = faScrewdriverWrench;
  faStairs = faStairs;
  faPlug = faPlug;
  faUsers = faUsers;

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

  public goToRankings() : void {
  this.router.navigate(['/busesServiceRankings']);
  }

  public goToServicings() :  void {
    this.router.navigate(['/busServicings']);
  }

  public goToChargingPlan() : void {
    this.router.navigate(['/chargingPlanGeneticAlgorithm'])
  }

  public goToReportMalfunction() : void {
    this.router.navigate(['/reportMalfunction'])
  }

  public goToMalfunctionData() : void {
    this.router.navigate(['malfunctionData']);
  }

  public goToManageRoles() : void {
    this.router.navigate(['superAdmin']);
  }

}
