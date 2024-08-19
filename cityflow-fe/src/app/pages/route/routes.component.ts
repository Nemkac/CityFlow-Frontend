import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faArrowDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { RouteListItemComponent } from '../../components/route-list-item/route-list-item.component';
import { RoutesService } from '../../service/routes.service';
import { Route } from '../../models/route';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [FontAwesomeModule, RouteListItemComponent, NgClass, FormsModule],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css'
})
export class RoutesComponent implements OnInit{
  //Icons
  faSearch = faSearch;
  faArrowDown = faArrowDown;
  faPlus = faPlus;

  routes : Route[] = [];
  public filteredRoutes : Route[] = [];
  public searchText : string = '';

  constructor(private routeService : RoutesService,
              private toast : NgToastService,
              private router: Router) {}

  ngOnInit(): void {
    this.fetchRoutes();
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

  public navigateToNewRoute() : void {
    this.router.navigate(['/newRoute']);
  }

  public handleRouteDeleted() : void {
    this.toast.success({detail:"SUCCESS",summary:'Route created successfully!'});
    this.fetchRoutes();
  }

}
