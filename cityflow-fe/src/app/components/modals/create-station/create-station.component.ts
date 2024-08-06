import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';
import { WaringnComponent } from '../waringn/waringn.component';
import { Location } from '../../../models/location';

@Component({
  selector: 'app-create-station',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-station.component.html',
  styleUrl: './create-station.component.css'
})
export class CreateStationComponent implements AfterViewInit{
  
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  private map!: L.Map;
  private marker?: L.Marker;

  public address : string = "";
  public latitude : number = 0;
  public longitude : number = 0;


  constructor(private activeModalService : NgbActiveModal,
    private modalService : NgbModal
  ){}

  public closeModal(){
    this.activeModalService.close();
  }

  ngAfterViewInit(): void {
    this.loadMap();
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
}
