import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';
import { RoutesService } from '../../../service/routes.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-edit-station',
  standalone: true,
  imports: [FormsModule],  // Add FormsModule for ngModel
  templateUrl: './edit-station.component.html',
  styleUrls: ['./edit-station.component.css']
})
export class EditStationComponent implements OnInit{

  @Input() station: any;
  @Input() address: string = '';
  @Input() latitude: number = 0;
  @Input() longitude: number = 0;

  @Output() stationEdited = new EventEmitter<void>();

  private map!: L.Map;
  private marker?: L.Marker;

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  constructor(public modalService: NgbActiveModal,
    private stationService : RoutesService
  ) {}

  ngOnInit(): void {
    this.loadMap();
  }

  loadMap() {
    this.map = L.map(this.mapContainer.nativeElement).setView(
      [this.latitude, this.longitude],
      16
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    this.marker = L.marker([this.latitude, this.longitude], { draggable: true }).addTo(this.map);

    // Add event listener for marker drag
    this.marker.on('dragend', (event: any) => {
      const newLatLng = event.target.getLatLng();
      this.latitude = newLatLng.lat;
      this.longitude = newLatLng.lng;
    });

    console.log('Map loaded');
  }

  private busIcon = L.icon({
    iconUrl: 'assets/bus.png',
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  public save() : void {
    const body = {
      location : this.station,
      address : this.address,
      latitude : this.latitude,
      longitude : this.longitude,
    };

    console.log(body);

    this.stationService.editStation(body).subscribe(
      (response : any) => {
        this.modalService.close();
        this.stationEdited.emit();
      },
      (error : HttpErrorResponse) => {
        console.log("Error while editing station", this.station);
      }
    )
    
  }
}