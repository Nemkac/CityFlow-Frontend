import { Component, Input } from '@angular/core';
import { Route } from '../../../models/route';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoutesService } from '../../../service/routes.service';
import { NgToastService } from 'ng-angular-popup';
import { BusService } from '../../../service/bus.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Bus } from '../../../models/bus';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bus-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bus-details.component.html',
  styleUrl: './bus-details.component.css'
})
export class BusDetailsComponent {
  @Input() bus! : any;

  public busRoutes : Route[] = [];

  public licencePlate : string = "";
  public chassisNumber : any;
  public manufactureDate : any;
  public seatingCapacity : any;
  public currentMileage : any;
  public batteryHealth : any;
  public batteryCapacity : any;
  public busType : any;
  public horsePower : any;
  public engineDisplacement : any;
  public transmission : any;

  public iceBus : any;
  public electricBus : any;

  constructor(public activeModalService : NgbActiveModal, 
    private modalService : NgbModal,
    private routeService : RoutesService,
    private toast : NgToastService,
    private busService : BusService,
  ){}

  ngOnInit(): void {
    console.log("BUSCINA", this.bus);
    if(this.bus.type === "ICEBus") {
      this.getICEBus();
    } 
    if(this.bus.type === "ElectricBus"){
      this.getElectricBus();
    }
    this.busRoutes = this.bus.routes
  }

  public initializeValues(passedBus : any) : void {
    this.licencePlate = this.bus.licencePlate;
    this.chassisNumber = this.bus.chassisNumber;
    this.manufactureDate = this.bus.malfunctionDate;
    this.seatingCapacity = this.bus.seatingCapacity;
    this.currentMileage = this.bus.currentMileage;
    if(this.electricBus != null){
      this.horsePower = 0;
      this.engineDisplacement = 0;
      this.transmission = 0;
      this.batteryHealth = passedBus.batteryHealty;
      this.batteryCapacity = passedBus.batteryCapacity;
    }
    if(this.iceBus != null){
      this.batteryHealth = 0;
      this.batteryCapacity = 0;
      this.horsePower = passedBus.horsePower;
      this.engineDisplacement = passedBus.engineDisplacement;
      this.transmission = passedBus.transmission;
    }
  }

  public getICEBus() : void {
    this.busService.getICEBus(this.bus).subscribe(
      (response : any) => {
        this.iceBus = response;
        this.initializeValues(this.iceBus)
        console.log("ICEBUS: ", this.iceBus)
      },
      (error : HttpErrorResponse) => {
        console.log("Error while getting ICEBus");
      }
    )
  }

  public getElectricBus() : void {
    this.busService.getElectricBus(this.bus).subscribe(
      (response : any) => {
        this.electricBus = response
        this.initializeValues(this.electricBus)
        console.log("Electric bus: ", this.electricBus)
      },
      (error : HttpErrorResponse) => {
        console.log("Error while getting Electric bus");
      }
    )
  }

}
