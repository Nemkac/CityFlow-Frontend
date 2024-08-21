import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';
import { WaringnComponent } from '../waringn/waringn.component';
import { Location } from '../../../models/location';
import { RoutesService } from '../../../service/routes.service';

@Component({
  selector: 'app-create-station',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-station.component.html',
  styleUrl: './create-station.component.css'
})
export class CreateStationComponent implements AfterViewInit{
  
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  @Output() stationCreated = new EventEmitter<void>();

  private map!: L.Map;
  private marker?: L.Marker;

  public address : string = "";
  public latitude : number = 0;
  public longitude : number = 0;

  public fetchedStations : Location[] = [];
  private markerMap = new Map<string, L.Marker>();


  constructor(private activeModalService : NgbActiveModal,
    private modalService : NgbModal,
    private routeService : RoutesService
  ){}

  public closeModal(){
    this.activeModalService.close();
  }

  ngAfterViewInit(): void {
    this.loadMap();
    this.fetchStations();
  }

  public fetchStations() {
    this.routeService.getAllStations().subscribe(
      (stations) => {
        this.fetchedStations = stations;
        stations.forEach(station => {
          const marker = L.marker([station.latitude, station.longitude], {icon : this.busIcon})
            .addTo(this.map)
            .bindPopup(station.address);
  
          const key = `${station.latitude},${station.longitude}`;
          this.markerMap.set(key, marker);
        });
      },
      (error) => {
        console.log("Error while fetching stations: ", error.message);
      }
    );
  }

  loadMap() {
    this.map = L.map(this.mapContainer.nativeElement).setView(
      [45.267136, 19.833549],
      16
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const clickedLat = e.latlng.lat;
      const clickedLng = e.latlng.lng;

      this.latitude = clickedLat;
      this.longitude = clickedLng;

      console.log("Latitude: ", this.latitude);
      console.log("Longitude: ", this.longitude);

      if (this.marker) {
        this.map.removeLayer(this.marker);
      }

      this.marker = L.marker([clickedLat, clickedLng]).addTo(this.map);
    });
    console.log('Map loaded')
  }

  public saveStation() : void{
    const body : Location = {
      address : this.address,
      latitude : this.latitude,
      longitude : this.longitude
    }

    console.log(body);

    this.routeService.saveStation(body).subscribe(
      (response : Location) => {
        console.log("Location successfully created!", response);
        this.stationCreated.emit();
        this.closeModal();
      }
    )
  }

  public cancelStationCreation() : void {
    const modalRef = this.modalService.open(
      WaringnComponent,
      { backdrop : 'static', keyboard : true }
    )

    modalRef.componentInstance.confirmation.subscribe(
      () => {
        this.address = ''
        this.latitude = 0;
        this.longitude = 0;
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }      
      }
    )
  }

  private busIcon = L.icon({
    iconUrl: 'assets/bus.png',
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}
