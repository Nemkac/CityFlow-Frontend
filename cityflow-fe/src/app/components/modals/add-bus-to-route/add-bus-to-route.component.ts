import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BusService } from '../../../service/bus.service';
import { Bus } from '../../../models/bus';
import { HttpErrorResponse } from '@angular/common/http';
import { Route } from '../../../models/route';
import { Location } from '../../../models/location';
import { RoutesService } from '../../../service/routes.service';
import { CommonModule } from '@angular/common';
import { AddBusToRouteDTO } from '../../../dtos/addBusToRouteDTO';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-bus-to-route',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-bus-to-route.component.html',
  styleUrl: './add-bus-to-route.component.css'
})
export class AddBusToRouteComponent implements OnInit{

  @Input() selectedRoute? : Route;
  @Output() busesAdded = new EventEmitter<void>(); 

  public destinations : any = '';
  public buses : Bus[] = [];
  public scaleDepartureTime : boolean = false;
  public extendClosingTime : boolean = false;

  public selectedBuses : Bus[] = [];
  
  constructor(public modalService : NgbActiveModal,
              private routeService : RoutesService,
              private toast : NgToastService,
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
    let body : AddBusToRouteDTO;
    if(this.selectedRoute){
      body  = {
        selectedRoute : this.selectedRoute,
        selectedBuses : this.selectedBuses,
        scaleDepartureTime : this.scaleDepartureTime,
        extendClosingTime : this.extendClosingTime
      }
      console.log(body);

      // this.routeService.addBusToRoute(body).subscribe(
      //   (response : string) => {
      //     this.toast.success({detail:`${response}`,summary:'Bus schedule changed successfully!'});
      //     this.busesAdded.emit();
      //   },
      //   (error : HttpErrorResponse) => {
      //     console.log("Error while editing bus schedule, ", error.message);
      //     this.toast.error({detail:"Error!",summary:'Bus schedule changed successfully!'});
      //   }
      // )
    }
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
