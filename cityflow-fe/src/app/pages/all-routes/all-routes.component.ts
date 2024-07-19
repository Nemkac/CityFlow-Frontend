import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { RoutesService } from '../../service/routes.service';
import { Route } from '../../models/route';
import { HttpErrorResponse } from '@angular/common/http';
import { RouteListItemComponent } from '../../components/route-list-item/route-list-item.component';
import { User } from '../../models/user';
import { AuthService } from '../../service/auth.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-all-routes',
  standalone: true,
  imports: [FontAwesomeModule, RouteListItemComponent],
  templateUrl: './all-routes.component.html',
  styleUrl: './all-routes.component.css'
})
export class AllRoutesComponent implements OnInit{

  faSearch = faSearch;
  faPlus = faPlus;

  routes : Route[] = [];

  token : string | null = localStorage.getItem('token');
  loggedUser! : User;
  loggedUserRole : string  = '';
  mostFrequentedRouteName: String = '';
  mostFrequentedRoute! : Route;

  constructor(private routeService : RoutesService,
              private router: Router,
              private authService: AuthService) {}
 
  ngOnInit(): void {
    this.fetchUser();
    this.fetchRoutes();
  }

  public fetchUser() : void {
    if(this.token != null){
      this.authService.getUserFromToken(this.token).subscribe(
        (response : User) => {
          this.loggedUser = response;
          this.loggedUserRole = this.loggedUser.roles;
          console.log(this.loggedUserRole);
          this.fetchMostFrequentedRoute(this.loggedUser.username);
        },
        (error: HttpErrorResponse) => {
          console.log('Error fetching user data:\n', error.message);
        }
      )
    }
  }

  public fetchRoutes() : void {
    this.routeService.getAll().subscribe(
      (response: Route[]) => {
        this.routes = response;
        console.log("ROUTES: \n", this.routes);
      },
      (error: HttpErrorResponse) => {
        console.log("Error while fetching routes:\n", error.message);
      }
    )
  }

  public trackBus() : void {
    this.router.navigate(['/busLiveTracking']);
  }

  public fetchMostFrequentedRoute(username : string) : void {
    this.routeService.getMostFrequentedRoute(username).subscribe(
      (response: String) => {
        this.mostFrequentedRouteName = response;
        if (this.mostFrequentedRouteName !== "None") {
          const foundRoute = this.routes.find(route => route.name === this.mostFrequentedRouteName);
          if (foundRoute) {
            this.mostFrequentedRoute = foundRoute;
            console.log(this.mostFrequentedRoute.name);
          }
        }
      },
      (error) => {
        console.log('Error fetching most frequented route:', error);
      }
    );
  }

}
