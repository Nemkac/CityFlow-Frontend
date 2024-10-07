import { Component, OnInit } from '@angular/core';
import { BusCardComponent } from '../../components/bus-card/bus-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Bus } from '../../models/bus';
import { BusService } from '../../service/bus.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateBusFormComponent } from '../../components/create-bus-form/create-bus-form.component';
import { NgToastService } from 'ng-angular-popup';
import { FormsModule } from '@angular/forms';
import { dA } from '@fullcalendar/core/internal-common';
import { forkJoin, map } from 'rxjs';

@Component({
	selector: 'app-buses',
	standalone: true,
	imports: [BusCardComponent, FontAwesomeModule, FormsModule],
	templateUrl: './buses.component.html',
	styleUrl: './buses.component.css'
})
export class BusesComponent implements OnInit{
	faSearch = faSearch;
	faPlus = faPlus;

	public buses : Bus[] = [];
	public searchText : string = '';
	public filteredBuses : Bus[] = [];

	constructor(private busService : BusService,
		private modalService: NgbModal,
		private toast : NgToastService
	){}
	
	ngOnInit(): void {
		this.fetchBuses();
	}

	public fetchBuses() : void {
		this.busService.getAll().subscribe({
			next: (data) => {
			  const busWithTypes$ = data.map((bus) => {
				return this.busService.getType(bus.id).pipe(
				  map((type: string) => ({
					...bus,
					type,  
					routeNames: bus.routes.map(route => route.name) 
				  }))
				);
			  });
		
			  forkJoin(busWithTypes$).subscribe({
				next: (busesWithTypes) => {
				  this.buses = busesWithTypes; 
				  this.filteredBuses = this.buses;
				  console.log(this.filteredBuses);
				},
				error: (error) => console.error('Error fetching bus types', error)
			  });
			},
			error: (error) => console.error('Error fetching buses', error)
		});
	}

	openCreateBusForm() {
		const modalRef = this.modalService.open(
		  CreateBusFormComponent,
		  { backdrop: 'static', keyboard: true }
		);

		modalRef.componentInstance.busCreated.subscribe(
			() => {
				this.fetchBuses();
			}
		)
	}

	public handleBusDeleted() : void {
		this.toast.success({ detail: "SUCCESS", summary: 'Route deleted successfully!' });
		this.fetchBuses();
	}

	public handleBusEdited() : void {
		this.fetchBuses();
		this.toast.success({ detail: "SUCCESS", summary: 'Bus edited successfully!' });
	}

	public searchBuses() : void  {
		if(!this.searchText) {
			this.filteredBuses = this.buses;
		  } else {
			this.filteredBuses = this.buses.filter(bus => 
			  bus.licencePlate.toLowerCase().includes(this.searchText.toLowerCase())
			);
		  }
	}
}
