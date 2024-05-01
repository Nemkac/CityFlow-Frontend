import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-create-route',
  standalone: true,
  imports: [],
  templateUrl: './create-route.component.html',
  styleUrl: './create-route.component.css'
})
export class CreateRouteComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  private map!: L.Map;
  private routingControl: any; // Promenljiva za čuvanje rutiranja
  private coordinates: L.LatLng[] = []; // Niz za čuvanje koordinata
  private toleranceRadius = 40; // Tolerancija u metrima
  private routeFinished = false; // Promenljiva koja prati da li je ruta završena
  
  private startingStation!: L.LatLng;
  private endingStation!: L.LatLng;
  private stations: L.LatLng[] = [];

  ngAfterViewInit(): void {
    this.loadMap();
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

    this.map.on('click', this.onMapClick.bind(this));
  }

  onMapClick(event: L.LeafletMouseEvent) {
    if (this.routeFinished) return;

    const clickedPoint = event.latlng;

    if (this.coordinates.length > 0) {
      const lastCoordinate = this.coordinates[this.coordinates.length - 1];
      const distance = lastCoordinate.distanceTo(clickedPoint);

      if (distance <= this.toleranceRadius) {
        alert('Route finished');
        this.routeFinished = true;
        this.markStartingAndEnding();
        return;
      }
    }

    this.coordinates.push(L.latLng(clickedPoint.lat, clickedPoint.lng));
    this.routingControl.setWaypoints(this.coordinates);

    if (this.coordinates.length > 1) {
      this.routingControl.route();
    }
  }

  markStartingAndEnding() {
    const startingPoint = this.coordinates[0];
    this.startingStation = startingPoint;
    console.log(this.startingStation);

    const endingPoint = this.coordinates[this.coordinates.length - 1];
    this.endingStation = endingPoint;
    console.log(this.endingStation);

    // Postavljamo markere za početak i kraj rute
    L.marker(startingPoint, { icon: this.startingIcon }).addTo(this.map).bindPopup('Starting Point');
    L.marker(endingPoint, { icon: this.endingIcon }).addTo(this.map).bindPopup('Ending Point');
  }

  // Stil za marker početne tačke
  private startingIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Stil za marker krajnje tačke
  private endingIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}
