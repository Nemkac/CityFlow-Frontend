import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-create-route',
  standalone: true,
  imports: [],
  templateUrl: './create-route.component.html',
  styleUrl: './create-route.component.css'
})
export class CreateRouteComponent implements AfterViewInit{
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
