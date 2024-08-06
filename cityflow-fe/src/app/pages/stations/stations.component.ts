import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateStationComponent } from '../../components/modals/create-station/create-station.component';
import { RoutesService } from '../../service/routes.service';
import { Location } from '../../models/location';
import { HttpErrorResponse } from '@angular/common/http';
import { StationCardComponent } from '../../components/station-card/station-card.component';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { StationsMapComponent } from '../../components/stations-map/stations-map.component';


@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [FontAwesomeModule, StationCardComponent, FormsModule, CommonModule, StationsMapComponent],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.css'
})
export class StationsComponent implements OnInit{
  @ViewChild('mapContainer', { static: true }) mapContainer?: ElementRef;
  
  faSearch = faSearch;

  private map!: L.Map;
  private markerMap = new Map<string, L.Marker>();
  
  public stations : Location[] = []
  public toggleMapView : boolean = false;

  constructor(private modalService : NgbModal,
    private routeService : RoutesService,
    private cdr: ChangeDetectorRef,
  ){}


  ngOnInit(): void {
    this.fetchStations();
  }

  public fetchStations() : void {
    this.routeService.getAllStations().subscribe(
      (response : Location[]) => {
        this.stations = response;
        console.log(this.stations);
      },
      (error : HttpErrorResponse) => {
        console.log("Error while fetching stations, ", error.message);
      }
    )
  }

  public openCreateStationForm(){
    this.modalService.open(
      CreateStationComponent,
      { backdrop : 'static', keyboard : true }
    );
  }

  public onViewChanged() {
    this.toggleMapView = !this.toggleMapView;
    console.log(this.toggleMapView);
  }
}
