import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { Location } from '../../models/location';
import { RoutesService } from '../../service/routes.service';

@Component({
  selector: 'app-stations-map',
  standalone: true,
  imports: [],
  templateUrl: './stations-map.component.html',
  styleUrl: './stations-map.component.css'
})
export class StationsMapComponent implements OnInit, AfterViewInit{
  @ViewChild('mapContainer', { static: true }) mapContainer?: ElementRef;
  private map!: L.Map;
  private markerMap = new Map<string, L.Marker>();
  public stations : Location[] = [];

  constructor(private routeService : RoutesService){}

  ngOnInit(): void {
    this.fetchStations();
  }

  ngAfterViewInit(): void {
    this.loadMap()
  }

  public fetchStations() {
    this.routeService.getAllStations().subscribe(
      (stations) => {
        this.stations = stations;
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
    if (this.map) {
      this.map.remove();
    }
    if (this.mapContainer && this.mapContainer.nativeElement) {
      this.map = L.map(this.mapContainer.nativeElement).setView([45.267136, 19.833549], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      this.fetchStations();
    } else {
      console.error('Map container is not available or visible.');
    }
  }

  private busIcon = L.icon({
    iconUrl: 'assets/bus.png',
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}
