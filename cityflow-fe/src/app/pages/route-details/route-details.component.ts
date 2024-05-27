import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Route } from '../../models/route';
import { RoutesService } from '../../service/routes.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRoute, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';
import { Routing } from 'leaflet';
import { Bus } from '../../models/bus';
import { BusesListItemComponent } from '../../components/buses-list-item/buses-list-item.component';

@Component({
  selector: 'app-route-details',
  standalone: true,
  imports: [FontAwesomeModule, BusesListItemComponent],
  templateUrl: './route-details.component.html',
  styleUrl: './route-details.component.css'
})
export class RouteDetailsComponent implements OnInit, AfterViewInit{
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  //Icons
  faPen = faPen;
  faTrash = faTrash;
  faRoute = faRoute;

  routeId : number = 0;
  route!: Route;
  startingPoint!: L.LatLng;
  endingPoint!: L.LatLng;
  stations: L.LatLng[] = []; 
  routeBuses : Bus[] = [];

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
        this.routeBuses = this.route.buses;
        this.fetchStations();

        console.log("ROUTE: \n", this.route);
      },
      (error : HttpErrorResponse) => {
        console.log("Error while fetching route: \n", error.message);
      }
    )
  }

  fetchStations() : void {
    const startingPoint: any = this.route.startingPoint;
    this.startingPoint = L.latLng(startingPoint.latitude, startingPoint.longitude);

    const endingPoint: any = this.route.endPoint;
    this.endingPoint = L.latLng(endingPoint.latitude, endingPoint.longitude);

    const stations: any[] = this.route.stations;
    this.stations = stations.map(station => L.latLng(station.latitude, station.longitude));

    console.log('Starting station: \n', this.startingPoint);
    console.log('Ending station: \n', this.endingPoint);
    console.log('Stations: \n', this.stations);
  }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap() {
    const map = L.map(this.mapContainer.nativeElement).setView(
      [this.startingPoint.lat, this.startingPoint.lng],
      12
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    L.marker([this.startingPoint.lat, this.startingPoint.lng], { icon: this.startingIcon }).addTo(map);

    this.stations.forEach(station => {
      L.marker([station.lat, station.lng], { icon: this.busIcon }).addTo(map);
    });

    L.marker([this.endingPoint.lat, this.endingPoint.lng], { icon: this.endingIcon }).addTo(map);
  
    const waypoints = [
      L.latLng(this.startingPoint.lat, this.startingPoint.lng),
      ...this.stations.map(station => L.latLng(station.lat, station.lng)),
      L.latLng(this.endingPoint.lat, this.endingPoint.lng)
    ];
  
    const plan = new L.Routing.Plan(waypoints, {
      createMarker: function() { return false; }
    });
  
    L.Routing.control({
      plan: plan,
    }).addTo(map);
  }

  
  private startingIcon = L.icon({
    iconUrl: 'assets/flag.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  private endingIcon = L.icon({
    iconUrl: 'assets/pin.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  private busIcon = L.icon({
    iconUrl: 'assets/bus.png',
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

}
