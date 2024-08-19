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
import { NgToastService } from 'ng-angular-popup';


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
  public filteredStations : Location[] = [];
  public toggleMapView : boolean = false;
  public searchText : string = '';

  constructor(private modalService : NgbModal,
    private routeService : RoutesService,
    private cdr: ChangeDetectorRef,
    private toast : NgToastService,
  ){}


  ngOnInit(): void {
    this.fetchStations();
  }

  public fetchStations() : void {
    this.filteredStations = [];
    this.routeService.getAllStations().subscribe(
      (response : Location[]) => {
        this.stations = response;
        this.filteredStations = this.stations;
        console.log(this.stations);
      },
      (error : HttpErrorResponse) => {
        console.log("Error while fetching stations, ", error.message);
      }
    )
  }

  public searchStations() : void{
    if(!this.searchText) {
      this.filteredStations = this.stations;
    } else {
      this.filteredStations = this.stations.filter(station => 
        station.address.toLowerCase().includes(this.searchText.toLowerCase())
      )
    }
  }

  public openCreateStationForm(){
    const modalRef = this.modalService.open(
      CreateStationComponent,
      { backdrop : 'static', keyboard : true }
    );

    modalRef.componentInstance.stationCreated.subscribe(
      () => {
        this.fetchStations();
        this.toast.success({detail: "Station successfully created!", summary: "Success!", duration: 3000});
      },
      (error : any) => {
        this.toast.error({detail: "Error while creating station!", summary: "Error!", duration: 3000});
      }
    )
  }

  public onViewChanged() {
    this.toggleMapView = !this.toggleMapView;
    console.log(this.toggleMapView);
  }
}
