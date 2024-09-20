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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-routes',
  standalone: true,
  imports: [FontAwesomeModule, RouteListItemComponent, FormsModule],
  templateUrl: './all-routes.component.html',
  styleUrl: './all-routes.component.css'
})
export class AllRoutesComponent implements OnInit{

  faSearch = faSearch;
  faPlus = faPlus;

  routes : Route[] = [];
  public filteredRoutes : Route[] = [];
  public searchText : string = '';

  token : string | null = sessionStorage.getItem('token');
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
        },
        (error: HttpErrorResponse) => {
          console.log('Error fetching user data:\n', error.message);
        }
      )
    }
  }

  public fetchRoutes() : void {
    this.filteredRoutes = [];
    this.routeService.getAll().subscribe(
      (response: Route[]) => {
        this.routes = response;
        this.filteredRoutes = this.routes;
        console.log("ROUTES: \n", this.routes);
      },
      (error: HttpErrorResponse) => {
        console.log("Error while fetching routes:\n", error.message);
      }
    )
  }

  public searchRoutes() : void {
    if(!this.searchText) {
      this.filteredRoutes = this.routes;
    } else {
      this.filteredRoutes = this.routes.filter(route => 
        route.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  public trackBus() : void {
    this.router.navigate(['/busLiveTracking']);
  }

}
