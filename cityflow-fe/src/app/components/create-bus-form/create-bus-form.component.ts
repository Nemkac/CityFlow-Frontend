import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imports: [FormsModule, NgClass, CommonModule, ReactiveFormsModule],
  templateUrl: './create-bus-form.component.html',
  styleUrl: './create-bus-form.component.css'
})
export class CreateBusFormComponent implements OnInit{

  public form! : FormGroup;

  @Output() busCreated = new EventEmitter<void>();

  public routes : Route[] = [];
  public selectedRoutes : Route[] = [];
  public selectedType : string = '';

  constructor(private routeService : RoutesService,
              private modalService : NgbActiveModal,
              private busService : BusService,
              private toast : NgToastService,
              private router: Router,
              private fb : FormBuilder){}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchRoutes();
  }

  public initializeForm() : void {
    this.form = this.fb.group({
      LicencePlate : ['', [Validators.required, Validators.pattern('^[A-Z]{2}-?\\d{1,4}-?[A-Z]{2}$')]],
      ManufactureDate : ['', Validators.required],
      SeatingCapacity : [0, [Validators.required, Validators.min(0)]],
      CurrentMileage : [0, [Validators.required, Validators.min(0)]],
      ChassisNumber : [0, Validators.required],
      Type : ['', Validators.required],
      EngineDisplacement : [0],
      HorsePower : [0],
      TransmissionType : [''],
      BatteryHealth : [0],
      BatteryCapacity : [0]
    });
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
    if(this.form.valid){
      const formData = this.form.value;
  
      const busDTO = {
        licencePlate : formData.LicencePlate,
        manufactureDate : formData.ManufactureDate,
        seatingCapacity : formData.SeatingCapacity,
        currentMileage : formData.CurrentMileage,
        chassisNumber : formData.ChassisNumber,
        type : formData.Type,
        engineDisplacement : formData.EngineDisplacement,
        horsePower : formData.HorsePower,
        transmission : formData.TransmissionType,
        batteryHealth : formData.BatteryHealth,
        batteryCapacity : formData.BatteryCapacity,
        routes : this.selectedRoutes
      }
  
      console.log(busDTO);

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
  }

  public closeModal() {
    this.modalService.close()
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

  public onLicencePlateInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const formattedValue = this.formatLicensePlate(inputElement.value);
  
    this.form.get('LicencePlate')?.setValue(formattedValue, { emitEvent: false });
  }
  
}
