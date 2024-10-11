import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bus } from '../../../models/bus';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Route } from '../../../models/route';
import { deleteBusFromRouteDTO } from '../../../dtos/deleteBusFromRouteDTO';
import { WaringnComponent } from '../waringn/waringn.component';
import { RoutesService } from '../../../service/routes.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpErrorResponse } from '@angular/common/http';
import { AddRouteToBusModalComponent } from '../add-route-to-bus-modal/add-route-to-bus-modal.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditBusDTO } from '../../../dtos/editBusDTO';
import { BusService } from '../../../service/bus.service';

@Component({
  selector: 'app-edit-bus-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-bus-modal.component.html',
  styleUrl: './edit-bus-modal.component.css'
})
export class EditBusModalComponent implements OnInit{

  @Input() bus! : any;

  @Output() busEdited = new EventEmitter<void>();

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

  public iceBus : any = null;
  public electricBus : any = null;

  constructor(public activeModalService : NgbActiveModal, 
    private modalService : NgbModal,
    private routeService : RoutesService,
    private toast : NgToastService,
    private busService : BusService,
  ){}

  ngOnInit(): void {
    console.log(this.bus);
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

  public edit() : void {
    const dto = {
      bus : this.bus,
      licencePlate : this.licencePlate,
      chassisNumber : this.chassisNumber,
      malfunctionDate : this.manufactureDate,
      seatingCapacity : this.seatingCapacity,
      currentMileage : this.currentMileage,
      batteryHealth : this.batteryHealth,
      batteryCapacity : this.batteryCapacity,
      horsePower : this.horsePower,
      engineDisplacement : this.engineDisplacement,
      transmission : this.transmission,
    }

    console.log("BODY", dto);

    this.busService.edit(dto).subscribe(
      (response : Bus) => {
        console.log(response);
        this.busEdited.emit();
        this.activeModalService.close();
      },
      (error : HttpErrorResponse) => {
        console.log("Error while editing licence plate, ", error.message);
      }
    ); 
  }

  async deleteBusFromRoute(routeId: number, busId : number) : Promise<void>{
    const dto : deleteBusFromRouteDTO = {
      routeId : routeId,
      busId : busId
    }

    console.log(dto);

    const modalRef = this.modalService.open(
      WaringnComponent,
      {backdrop: 'static', keyboard : true}
    );

    modalRef.componentInstance.confirmation.subscribe(
      (res : any) => {
        this.routeService.deleteBusFromRoute(dto).subscribe(
          (response: any) => {
            console.log(response);
            this.toast.success({ detail: "SUCCESS", summary: 'Bus successfully edited!' });
            this.activeModalService.close();
            this.busEdited.emit();
          },
          (error : HttpErrorResponse) => {
            console.log("Error while deleting bus from route, ", error.message);
            this.toast.error({detail: "Error!", summary: "Error while editing bus!"})
          }
        );  
      }
    );
  }

  public addRouteToBus() : void {
    const modalRef = this.modalService.open(
      AddRouteToBusModalComponent, 
      { backdrop : 'static', keyboard : true }
    );

    modalRef.componentInstance.bus = this.bus;
    modalRef.componentInstance.routesAdded.subscribe(
      () => {
        this.toast.success({ detail: "SUCCESS", summary: 'Bus successfully edited!' });
        this.activeModalService.close();
        this.busEdited.emit();
      }
    )
  }

  public formatLicensePlate(input: string): string {
    let sanitized = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
  
    const pattern = /^([A-Z]{2})(\d{1,5})([A-Z]{2})$/;
    const match = sanitized.match(pattern);
  
    if (match) {
      let numbers = match[2];
  
      if (numbers.length < 3) {
        numbers = numbers.padStart(3, '0');
      }
  
      return `${match[1]}${numbers}${match[3]}`;
    } else {
      return sanitized; 
    }
  }
}
