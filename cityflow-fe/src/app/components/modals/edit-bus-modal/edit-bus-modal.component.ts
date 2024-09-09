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
import { FormsModule } from '@angular/forms';
import { EditBusDTO } from '../../../dtos/editBusDTO';
import { BusService } from '../../../service/bus.service';

@Component({
  selector: 'app-edit-bus-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-bus-modal.component.html',
  styleUrl: './edit-bus-modal.component.css'
})
export class EditBusModalComponent implements OnInit{

  @Input() bus! : Bus;

  @Output() busEdited = new EventEmitter<void>();

  public busRoutes : Route[] = [];
  public licencePlate : string = "";

  constructor(public activeModalService : NgbActiveModal, 
    private modalService : NgbModal,
    private routeService : RoutesService,
    private toast : NgToastService,
    private busService : BusService
  ){}

  ngOnInit(): void {
    console.log(this.bus);
    this.busRoutes = this.bus.routes
  }

  public edit() : void {
    const dto : EditBusDTO = {
      bus : this.bus,
      licencePlate : this.licencePlate
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
    if (input.length > 11) {
      input = input.substring(0, 11);
    }
  
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
