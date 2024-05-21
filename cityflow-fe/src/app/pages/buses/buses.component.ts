import { Component, OnInit } from '@angular/core';
import { BusCardComponent } from '../../components/bus-card/bus-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Bus } from '../../models/bus';
import { BusService } from '../../service/bus.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-buses',
	standalone: true,
	imports: [BusCardComponent, FontAwesomeModule],
	templateUrl: './buses.component.html',
	styleUrl: './buses.component.css'
})
export class BusesComponent implements OnInit{
	faSearch = faSearch;
	faPlus = faPlus;

	buses : Bus[] = [];

	constructor(private busService : BusService){}
	
	ngOnInit(): void {
		this.fetchBuses();
	}

	public fetchBuses() : void {
		this.busService.getAll().subscribe(
			(response : Bus[]) => {
				this.buses = response;
				console.log(this.buses);
			},
			(error : HttpErrorResponse) => {
				console.log('Error fetching buses: ', error.message);
			}
		)
	}
}
