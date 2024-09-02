import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RoutesService } from '../../service/routes.service';
import { Route } from '../../models/route';
import { HttpErrorResponse } from '@angular/common/http';
import { BusDTO } from '../../dtos/busDTO';
import { BusService } from '../../service/bus.service';
import { Bus } from '../../models/bus';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-bus-form',
  standalone: true,
  imports: [FormsModule, NgClass, CommonModule],
  templateUrl: './create-bus-form.component.html',
  styleUrl: './create-bus-form.component.css'
})
export class CreateBusFormComponent implements OnInit{

  @Output() busCreated = new EventEmitter<void>();

  licencePlate : string = '';
  routes : Route[] = [];
  selectedRoutes : Route[] = [];

  public isOpen = false;

  constructor(private routeService : RoutesService,
              private modalService : NgbActiveModal,
              private busService : BusService,
              private toast : NgToastService,
              private router: Router){}

  ngOnInit(): void {
    this.fetchRoutes();
  }

  public selectRoute(selectedRoute : Route) : void {
    if (!this.selectedRoutes.some(route => route.id === selectedRoute.id)) {
      this.selectedRoutes.push(selectedRoute);
    }
  }

  public deselectRoute() : void {
    this.selectedRoutes.pop();
  }

  public onCheckboxChange(event: Event, selectedRoute: Route): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectRoute(selectedRoute)
    } else {
      this.deselectRoute();
    }
  }

  public fetchRoutes() : void {
    this.routeService.getAll().subscribe(
      (response : Route[]) => {
        this.routes = response;
        console.log(this.routes);
      },
      (error : HttpErrorResponse) => {
        console.log("Error fetching routes: ", error.message);
      }
    )
  }

  public createBus() : void {
    this.licencePlate = this.formatLicensePlate(this.licencePlate);

    const busDTO : BusDTO = {
      licencePlate : this.licencePlate,
      routes : this.selectedRoutes
    }
    console.log(busDTO)
    this.busService.save(busDTO).subscribe(
      (response : Bus) => {
        console.log(response);
        this.toast.success({detail:"SUCCESS",summary:'Bus created successfully!'});
        this.busCreated.emit();
        this.closeModal();
      },
      (error : HttpErrorResponse) => {
        console.log("Error while creating new bus: ", error.message);
        this.toast.error({detail:"Error",summary:'Error while creating new bus!'});
      }
    );
  }

  public toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  public closeModal() {
    this.modalService.close()
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

  public setActive(selectedRoute: Route): void {
    const index = this.selectedRoutes.findIndex(route => route.id === selectedRoute.id);

    if (index === -1) {
      this.selectedRoutes.push(selectedRoute);
    } else {
      this.selectedRoutes.splice(index, 1);
    }
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
