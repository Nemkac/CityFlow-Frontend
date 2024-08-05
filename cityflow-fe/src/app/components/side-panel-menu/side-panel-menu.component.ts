import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHome, faIdCard, faInbox, faCalendar, faBus, faMoneyBillTransfer, faRoute } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { RoutesService } from '../../service/routes.service';

@Component({
  selector: 'app-side-panel-menu',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './side-panel-menu.component.html',
  styleUrl: './side-panel-menu.component.css'
})
export class SidePanelMenuComponent implements OnInit, AfterViewInit{
  //Icons
  faUser = faUser;
  faHome = faHome;
  faIdCard = faIdCard;
  faInbox = faInbox;
  faBus = faBus;
  faMoneyBillTransfer = faMoneyBillTransfer;
  faRoute = faRoute;

  faCalendar = faCalendar;
  
  //Menu item selections
  showDashboard : boolean = true;
  showProfile : boolean = false;
  showCards : boolean = false;
  showInbox : boolean = false;
  showRoutes : boolean = false;
  showBuses : boolean = false;
  showEmployees: boolean = false;
  showUserBalance: boolean = false;
  showUserCardBalance: boolean = false;
  showRequests : boolean = false;
  showWorkCalendar: boolean = false
  showUserRoutes : boolean = false;

  token : string | null = localStorage.getItem('token');
  loggedUser! : User;
  loggedUserRole : string  = '';

  //PDF DATA
  routesWithAtLeastThreeStations: String[] = [];
  longestRouteName: String = '';
  stationsCount: number = 0;

  constructor(private authService : AuthService,
              private router: Router,
              private routeService: RoutesService){}

  ngOnInit(): void {
    this.fetchUser();
    this.fetchPdfData();
  }

  ngAfterViewInit(): void {
    this.fetchLongestRouteStationCount();
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
    this.showDashboard = true;
    this.showProfile = false;
    this.showCards = false;
    this.showInbox = false;
    this.showRoutes = false;
    this.showEmployees = false;
    this.showUserBalance = false;
    this.showUserCardBalance = false;
    this.showRequests = false;
    this.showBuses = false;
    this.showWorkCalendar = false;
    this.showUserRoutes = false;
    this.navigateToDashboard();
  }
  
  public viewProfile() : void{
    this.showDashboard = false;
    this.showProfile = true;
    this.showCards = false;
    this.showInbox = false;
    this.showRoutes = false;
    this.showEmployees = false;
    this.showUserBalance = false;
    this.showUserCardBalance = false;
    this.showRequests = false;
    this.showBuses = false;
    this.navigateToProfile();
    this.showWorkCalendar = false;
    this.showUserRoutes = false;
  }

  public viewCards() : void{
    this.showDashboard = false;
    this.showProfile = false;
    this.showCards = true;
    this.showInbox = false;
    this.navigateToCards();
    this.showWorkCalendar = false;
    this.showUserRoutes = false;
    this.showUserCardBalance = false;
  }

  public viewUserRoutes() : void{
    this.showDashboard = false;
    this.showProfile = false;
    this.showCards = false;
    this.showInbox = false;
    this.navigateToUserRoutes();
    this.showWorkCalendar = false;
    this.showUserRoutes = true;
    this.showUserCardBalance = false;
  }
  
  public viewInbox() : void{
    this.showDashboard = false;
    this.showProfile = false;
    this.showCards = false;
    this.showInbox = true;
    this.showRoutes = false;
    this.showEmployees = false;
    this.showUserBalance = false;
    this.showUserCardBalance = false;
    this.showRequests = false;
    this.showBuses = false;
    this.showWorkCalendar = false;
    this.showUserRoutes = false;
  }

  public viewRoutes() : void{
    this.showDashboard = false;
    this.showProfile = false;
    this.showRoutes = true;
    this.showInbox = false;
    this.showBuses = false;
    this.navigateToRoutes();
    this.showWorkCalendar = false;
  }

  public viewBuses() : void{
    this.showDashboard = false;
    this.showProfile = false;
    this.showRoutes = false;
    this.showInbox = false;
    this.showBuses = true;
    this.navigateToBuses();
  }

  public viewEmployees() : void{
    this.showDashboard = false;
    this.showProfile = false;
    this.showEmployees = true;
    this.showInbox = false;
    this.navigateToEmployees();
    this.showWorkCalendar = false;
  }
  public viewUserBalance() : void{
    this.showDashboard = false;
    this.showProfile = false;
    this.showInbox = false;
    this.showUserBalance = true;
    this.showUserCardBalance = false;
    this.showRequests = false;
    this.navigateToUserBalance();
  }
  public viewUserRequests() : void{
    this.showDashboard = false;
    this.showProfile = false;
    this.showInbox = false;
    this.showUserBalance = false;
    this.showUserCardBalance = false;
    this.showRequests = true;
    this.navigateToDocumentRequests();
    this.showWorkCalendar = false;
  }
  public viewUserCardBalance() : void{
    this.showDashboard = false;
    this.showProfile = false;
    this.showInbox = false;
    this.showUserBalance = false;
    this.showUserCardBalance = true;
    this.showCards = false;
    this.navigateToUserCardBalance();
    this.showWorkCalendar = false;
    this.showUserRoutes = false;
  }
  public viewWorkCalendar() : void{
    this.showDashboard = false;
    this.showProfile = false;
    this.showCards = false;
    this.showInbox = false;
    this.showRoutes = false;
    this.showEmployees = false;
    this.showUserBalance = false;
    this.showUserCardBalance = false;
    this.showWorkCalendar = true;
    this.navigateToWorkCalendar();
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
  public navigateToWorkCalendar() : void {
    this.router.navigate(['/work-calendar']);
  }
  public navigateToUserRoutes() : void {
    this.router.navigate(['/allRoutes']);
  }
  public navigateToDashboard() : void {
    this.router.navigate(['/dashboard']);
  }

  public fetchPdfData() : void {
    this.routeService.getRouteWithAtLeastThreeStations().subscribe(
      (response : String[]) => {
        this.routesWithAtLeastThreeStations = response;
        console.log("Three stations successful");
      }, (error: HttpErrorResponse) => {
        console.log("Error 1", error.message)
      }
    );

    this.routeService.getLongestRoute().subscribe(
      (response: String) => {
        this.longestRouteName = response;
        console.log("Longest route successful");
      }, (error: HttpErrorResponse) => {
        console.log("Error 2", error.message);
      }
    );
  }
  
  public generatePDF() : void {
    const doc = new jsPDF();

    const imgData = 'assets/LogoWithNameGrey.png';
    doc.addImage(imgData, 'PNG', 10, 10, 60, 30);
    
    doc.setFontSize(32);
    doc.text('GENERAL ROUTE STATISTICS, 2024', 10, 60);
  
    doc.setFontSize(12);
    doc.text(`Routes with three or more stations: ${this.routesWithAtLeastThreeStations}`, 10, 90);
    doc.text(`Longest route: ${this.longestRouteName}`, 10, 100);
    doc.text(`Number of stations on longest route: ${this.stationsCount}`, 10, 110);
  
    doc.save('Route_statistics.pdf');
  }

  public fetchLongestRouteStationCount() : void {
    this.routeService.getStationsCount(this.longestRouteName).subscribe(
      (response : number) => {
        this.stationsCount = response;
        console.log("Stations count successful");
      }, (error: HttpErrorResponse) => {
        console.log("Error 3", error.message);
      }
    )
  }
}
