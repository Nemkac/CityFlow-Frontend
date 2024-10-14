import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '../../../models/location';
import * as L from 'leaflet';

@Component({
  selector: 'app-view-station',
  standalone: true,
  imports: [],
  templateUrl: './view-station.component.html',
  styleUrl: './view-station.component.css'
})
export class ViewStationComponent implements OnInit{

  @Input() address : string = '';
  @Input() latitude : number = 0;
  @Input() longitude : number = 0;

  private map!: L.Map;
  private marker?: L.Marker;

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  constructor(public modalService : NgbActiveModal){}

  ngOnInit(): void {
    this.loadMap();
  }

  loadMap() {
    this.map = L.map(this.mapContainer.nativeElement).setView(
      [this.latitude, this.longitude],
      16
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map);

    console.log('Map loaded')
  }

  private busIcon = L.icon({
    iconUrl: 'assets/bus.png',
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}
