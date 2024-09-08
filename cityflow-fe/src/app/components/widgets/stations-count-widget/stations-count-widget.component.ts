import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../../../service/routes.service';
import { Location } from '../../../models/location';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-stations-count-widget',
  standalone: true,
  imports: [],
  templateUrl: './stations-count-widget.component.html',
  styleUrl: './stations-count-widget.component.css'
})
export class StationsCountWidgetComponent implements OnInit{

  public stations : Location[] = [];

  constructor(private routeService : RoutesService){}

  ngOnInit(): void {
    this.getStationsCount();
  }


  public getStationsCount() : void {
    this.routeService.getAllStations().subscribe(
      (response : Location[]) => {
        this.stations = response;
      },
      (error : HttpErrorResponse) => {
        console.log("Error while counting stations, ", error.message);
      }
    )
  }
}
