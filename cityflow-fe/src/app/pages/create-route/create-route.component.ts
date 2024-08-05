import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Location } from '../../models/location';
import { FormsModule } from '@angular/forms';
import { RouteDTO } from '../../dtos/routeDTO';
import { RoutesService } from '../../service/routes.service';
import { Route } from '../../models/route';
import { HttpErrorResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WaringnComponent } from '../../components/modals/waringn/waringn.component';

L.Icon.Default.imagePath = 'assets/busSelected.png';
L.Marker.prototype.options.icon = new L.Icon({
    iconUrl: 'assets/busSelected.png',
    iconRetinaUrl: 'assets/busSelected.png',
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

@Component({
  selector: 'app-create-route',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './create-route.component.html',
  styleUrl: './create-route.component.css'
})
export class CreateRouteComponent implements AfterViewInit, OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  faPlus = faPlus;

  private map!: L.Map;
  private routingControl: any; // Promenljiva za čuvanje rutiranja
  private coordinates: L.LatLng[] = []; // Niz za čuvanje koordinata
  private toleranceRadius = 30; // Tolerancija u metrima
  public routeFinished = false; // Promenljiva koja prati da li je ruta završena
  
  private markerMap = new Map<string, L.Marker>();

  public fetchedStations : Location[] = [];
  public possibleToSave : boolean = false;

  routeName: string = "";
  openingTime: string = "";
  closingTime: string = "";
  startingStation?: L.LatLng;
  endingStation?: L.LatLng;
  selectedStations: L.LatLng[] = [];

  constructor(private routeService : RoutesService,
              private toast: NgToastService,
              private modalService : NgbModal,
              private router: Router){}

  ngAfterViewInit(): void {
    this.loadMap();
  }

  ngOnInit(): void {
    this.fetchStations();
  }
  

  public fetchStations() {
    this.routeService.getAllStations().subscribe(
      (response : Location[]) => {
        this.fetchedStations = response;
        console.log(this.fetchedStations);
      },
      (error : HttpErrorResponse) => {
        console.log("Error while fetching stations, ", error.message);
      }
    )
  }

  loadMap() {
    this.map = L.map(this.mapContainer.nativeElement).setView(
      [45.267136, 19.833549],
      16
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  
    this.routingControl = L.Routing.control({
      waypoints: [],
      routeWhileDragging: true,
    }).addTo(this.map);
    
    this.routeService.getAllStations().subscribe(
      (stations) => {
        stations.forEach(station => {
          const marker = L.marker([station.latitude, station.longitude], {icon : this.busIcon})
            .addTo(this.map)
            .bindPopup(station.address);
  
          const key = `${station.latitude},${station.longitude}`;
          this.markerMap.set(key, marker);
  
          marker.on('click', () => this.onMarkerClick(marker));
        });
      },
      (error) => {
        console.log("Error while fetching stations: ", error.message);
      }
    );
  }


  onMarkerClick(marker: L.Marker): void {
    const key = `${marker.getLatLng().lat},${marker.getLatLng().lng}`;
    const clickedMarker = this.markerMap.get(key);
  
    if (clickedMarker && !this.routeFinished) {
      const latLng = marker.getLatLng();
      const existingIndex = this.coordinates.findIndex(coord => coord.equals(latLng));
  
      if (existingIndex !== -1) {
        if (this.coordinates[existingIndex] === latLng) {
          this.routeFinished = true;
          alert('Route finished');
          this.markStartingAndEnding();
          return;
        }
      } else {
        this.addPointToRoute(marker);
      }
    } else {
      console.log("Marker with this location is not registered in the map or route is finished.");
    }
  }
  

  addPointToRoute(marker: L.Marker): void {
    const latLng = marker.getLatLng();  
    if (!this.coordinates.some(coord => coord.equals(latLng))) {
      this.coordinates.push(latLng);
      this.routingControl.setWaypoints(this.coordinates);
  
      if (this.coordinates.length > 1) {
        this.possibleToSave = true;
        this.routingControl.route();
      } else {
        this.possibleToSave = false;
      }
    } else {
      console.log("This point is already in the route.");
    }
  }

  markStartingAndEnding() {
    const startingPoint = this.coordinates[0];
    this.startingStation = startingPoint;
    console.log(this.startingStation);
  
    const endingPoint = this.coordinates[this.coordinates.length - 1];
    this.endingStation = endingPoint;
    console.log(this.endingStation);
  
    this.selectedStations = this.coordinates.slice(1, -1).map(coordinate => L.latLng(coordinate.lat, coordinate.lng));
    console.log(this.selectedStations);
  
    L.marker(startingPoint, { icon: this.startingIcon }).addTo(this.map).bindPopup('Starting Point');
    L.marker(endingPoint, { icon: this.endingIcon }).addTo(this.map).bindPopup('Ending Point');
  }

  public saveRoute() : void {
    const startingPoint: Location = {address: "Address", latitude: this.startingStation!.lat, longitude: this.startingStation!.lng };
    const endingPoint: Location = {address:"Address", latitude: this.endingStation!.lat, longitude: this.endingStation!.lng };

    const stationsArray: Location[] = this.selectedStations.map(station => ({address:"Address", latitude: station.lat, longitude: station.lng }));
    const routeDTO: RouteDTO = {
      routeName: this.routeName,
      startingPoint: startingPoint,
      endingPoint: endingPoint,
      stations: stationsArray,
      openingTime: this.openingTime,
      closingTime: this.closingTime
    };

    console.log(routeDTO);

    // this.routeService.saveRoute(routeDTO).subscribe(
    //   (response : Route) => {
    //     console.log(response);
    //     this.toast.success({detail:"SUCCESS",summary:'Route created successfully!'});
    //     setTimeout(() => {
    //       this.router.navigate(['/routes'])
    //     }, 3000);
    //   },
    //   (error : HttpErrorResponse) => {
    //     console.log("Error while creating route: \n", error.message);
    //   }
    // );
  } 

  public cancelRouteCreation(): void {
    const modalRef = this.modalService.open(
      WaringnComponent,
      { backdrop : 'static', keyboard : true }
    );

    modalRef.componentInstance.confirmation.subscribe(
      () => {
        this.coordinates = [];
        this.routingControl.setWaypoints(this.coordinates);
        this.map.eachLayer((layer) => {
          if (layer instanceof L.Marker && (layer.options.icon === this.startingIcon || layer.options.icon === this.endingIcon)) {
            this.map.removeLayer(layer);
          }
        });
      
        this.routeFinished = false;
        this.possibleToSave = false;
        this.routeName = "";
        this.openingTime = "";
        this.closingTime = "";
        this.startingStation = undefined;
        this.endingStation = undefined;
        this.selectedStations = [];
      
        console.log("Route creation has been reset.");
      }
    )
  }

  public finishCreatingRoute() {
    alert('Route finished');
    this.routeFinished = true;
    this.possibleToSave = false;
    this.markStartingAndEnding();
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
