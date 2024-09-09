import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoutesService } from '../../../service/routes.service';
import { Location } from '../../../models/location';
import { HttpErrorResponse } from '@angular/common/http';
import { RouteAdministratorService } from '../../../service/route-administrator.service';
import { Widget } from '../../../models/widget';

@Component({
  selector: 'app-stations-count-widget',
  standalone: true,
  imports: [],
  templateUrl: './stations-count-widget.component.html',
  styleUrl: './stations-count-widget.component.css'
})
export class StationsCountWidgetComponent implements OnInit{

  @Input() widget? : Widget;

  @Output() widgetRemoved = new EventEmitter<string>();

  public stations : Location[] = [];

  constructor(private routeAdministratorService : RouteAdministratorService,
    private routeService : RoutesService
  ){}

  ngOnInit(): void {
    this.getStationsCount();
  }

  public removeWidgetFromDashboard() : void {
    if(this.widget){
      this.routeAdministratorService.removeWidgetFromDashboard(this.widget).subscribe(
        (response : string) => {
          console.log("Widget successfully removed from dashboard");
          this.widgetRemoved.emit(response);
        },
        (error : HttpErrorResponse) => {
          console.log("Error while deleting widget from dashboard, ", error.message);
        }
      )
    }
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
