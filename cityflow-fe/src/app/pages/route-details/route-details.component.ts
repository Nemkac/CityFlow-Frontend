import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Route } from '../../models/route';
import { RoutesService } from '../../service/routes.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';

@Component({
  selector: 'app-route-details',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './route-details.component.html',
  styleUrl: './route-details.component.css'
})
export class RouteDetailsComponent implements OnInit, AfterViewInit{
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

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap() {
    const map = L.map(this.mapContainer.nativeElement).setView(
      [45.267136, 19.833549],
      12
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([45.267136, 19.833549]).addTo(map);
  }

}
