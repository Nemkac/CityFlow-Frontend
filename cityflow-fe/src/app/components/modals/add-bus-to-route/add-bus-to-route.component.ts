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
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-bus-to-route',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-bus-to-route.component.html',
  styleUrl: './add-bus-to-route.component.css'
})
export class AddBusToRouteComponent implements OnInit{

  public form! : FormGroup;

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
              private fb : FormBuilder,
              private busService : BusService,){}

  ngOnInit(): void {
    this.getDestinations();
    this.fetchBuses();

    this.form = this.fb.group({
      option : ['', Validators.required]
    });
  }

  public fetchBuses() : void {
    this.busService.getAll().subscribe(
      (response : Bus[]) => {
        const assignedBusIds = new Set(this.selectedRoute?.buses.map(bus => bus.id));
        this.buses = response.filter(bus => !assignedBusIds.has(bus.id));
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

      const formValue = this.form.value;

      if(formValue.option === "scaleDepartureTime"){
        this.scaleDepartureTime = true;
        this.extendClosingTime = false;
      }

      if(formValue.option === "extendClosingTime"){
        this.scaleDepartureTime = false;
        this.extendClosingTime = true;
      }

      body  = {
        selectedRoute : this.selectedRoute,
        selectedBuses : this.selectedBuses,
        scaleDepartureTime : this.scaleDepartureTime,
        extendClosingTime : this.extendClosingTime
      }
      console.log(body);

      this.routeService.addBusToRoute(body).subscribe(
        (response : string) => {
          this.toast.success({detail:`${response}`,summary:'Bus schedule changed successfully!'});
          this.busesAdded.emit();
          this.modalService.close();
        },
        (error : HttpErrorResponse) => {
          console.log("Error while editing bus schedule, ", error);
          this.modalService.close();
          this.toast.error({detail:"Error!",summary:'Error while changing bus schedule!'});
        }
      )
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
