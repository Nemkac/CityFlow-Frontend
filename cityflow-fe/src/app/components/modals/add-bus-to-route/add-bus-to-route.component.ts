import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BusService } from '../../../service/bus.service';
import { Bus } from '../../../models/bus';
import { HttpErrorResponse } from '@angular/common/http';
import { Route } from '../../../models/route';
import { Location } from '../../../models/location';
import { RoutesService } from '../../../service/routes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-bus-to-route',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-bus-to-route.component.html',
  styleUrl: './add-bus-to-route.component.css'
})
export class AddBusToRouteComponent implements OnInit{

  @Input() selectedRoute? : Route;

  public destinations : any = '';
  public buses : Bus[] = [];

  public selectedBuses : Bus[] = [];
  
  constructor(public modalService : NgbActiveModal,
              private routeService : RoutesService,
              private busService : BusService,){}

  ngOnInit(): void {
    this.getDestinations();
    this.fetchBuses();
  }

  public fetchBuses() : void {
    this.busService.getAll().subscribe(
      (response : Bus[]) => {
        this.buses = response;
      },
      (error : HttpErrorResponse) => {
        console.log("Error while fetching buses, ", error.message);
      }
    )
  }

  public getDestinations() : void {
    if(this.selectedRoute){
      this.routeService.getDestinations(this.selectedRoute?.id).subscribe(
        (response : any) => {
          this.destinations = response;
        },
        (error : HttpErrorResponse) => {
          console.log("Error while fetching route destinations, ", error.message);
        }
      )
    }
  }

  public addBusses() : void {
    const body = {
      route : this.selectedRoute,
      buses : this.selectedBuses
    }

    console.log(body);
  }

  public setActive(selectedBus: Bus): void {
    const index = this.selectedBuses.findIndex(bus => bus.id === selectedBus.id);

    if (index === -1) {
      this.selectedBuses.push(selectedBus);
    } else {
      this.selectedBuses.splice(index, 1);
    }
  }

  public isActive(selectedBus: Bus): boolean {
    const index = this.selectedBuses.findIndex(bus => bus.id === selectedBus.id);

    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }
}
