import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Bus } from '../../../models/bus';
import { Route } from '../../../models/route';
import { RoutesService } from '../../../service/routes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddRoutesToBusDTO } from '../../../dtos/addRoutesToBusDTO';
import { BusService } from '../../../service/bus.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-route-to-bus-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-route-to-bus-modal.component.html',
  styleUrl: './add-route-to-bus-modal.component.css'
})
export class AddRouteToBusModalComponent implements OnInit{

  public form! : FormGroup

  @Input() bus! : Bus;

  @Output() routesAdded = new EventEmitter<void>();

  public routes : Route[] = [];
  public busRoutes : Route[] = [];
  public availableRoutes : Route[] = [];
  public selectedRoutes : Route[] = [];
  public scaleDepartureTime : boolean = false;
  public extendClosingTime : boolean = false;

  constructor(public activeModalService : NgbActiveModal,
    private routeService : RoutesService,
    private busService : BusService,
    private fb : FormBuilder
  ){}

  ngOnInit(): void {
    this.busRoutes = this.bus.routes;
    this.getAllRoutes();

    this.form = this.fb.group({
      option : ['', Validators.required]
    });
  }

  public getAllRoutes() : void {
    this.routeService.getAll().subscribe(
      (response : Route[]) => {
        this.routes = response;
        this.availableRoutes = this.routes.filter(route => 
          !this.busRoutes.some(busRoute => busRoute.id === route.id)
        );
      },
      (error : HttpErrorResponse) => {
        console.log("Error while fetching routes, ", error.message);
      }
    )
  }

  public addRoutesToBus() : void {
    if(this.form.valid){
      const formValue = this.form.value;

      if(formValue.option === "scaleDepartureTime"){
        this.scaleDepartureTime = true;
        this.extendClosingTime = false;
      }

      if(formValue.option === "extendClosingTime"){
        this.scaleDepartureTime = false;
        this.extendClosingTime = true;
      }
      
      const body : AddRoutesToBusDTO = {
        bus : this.bus,
        routes : this.selectedRoutes,
        scaleDepartureTime : this.scaleDepartureTime,
        extendClosingTime : this.extendClosingTime
      }

      console.log(body);

      this.busService.addRoutesToBus(body).subscribe(
        (response : string) => {
          console.log(response);
          this.routesAdded.emit();
          this.activeModalService.close();
        },
        (error : HttpErrorResponse) => {
          console.log("Error while adding routes to bus", error);
        }
      )
    }
  }

  public setActive(selectedRoute: Route): void {
    const index = this.selectedRoutes.findIndex(route => route.id === selectedRoute.id);

    if (index === -1) {
      this.selectedRoutes.push(selectedRoute);
    } else {
      this.selectedRoutes.splice(index, 1);
    }

    console.log(this.selectedRoutes);
  }

  public isActive(selectedRoute: Route): boolean {
    const index = this.selectedRoutes.findIndex(route => route.id === selectedRoute.id);

    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }
}
