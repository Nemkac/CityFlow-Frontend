import { Component, Input, OnInit } from '@angular/core';
import { Route } from '../../models/route';
import { RoutesService } from '../../service/routes.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-route-details',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './route-details.component.html',
  styleUrl: './route-details.component.css'
})
export class RouteDetailsComponent implements OnInit{
  //Icons
  faBus = faBus;
  faPen = faPen;
  faTrash = faTrash;

  routeId : number = 0;
  route!: Route;

  constructor(private routeService: RoutesService,
              private routes: ActivatedRoute){}

  ngOnInit(): void {
    const idFromRoute = this.routes.snapshot.paramMap.get('id');
    if(idFromRoute != null){
      this.routeId =+ idFromRoute;
      this.fetchRoute();
    }
  }

  public fetchRoute() : void{
    this.routeService.getRoute(this.routeId).subscribe(
      (response : Route) => {
        this.route = response;
        console.log("ROUTE: \n", this.route);
      },
      (error : HttpErrorResponse) => {
        console.log("Error while fetching route: \n", error.message);
      }
    )
  }

}
