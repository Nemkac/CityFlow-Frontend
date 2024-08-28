import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { BusService } from '../../service/bus.service';
import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WaringnComponent } from '../modals/waringn/waringn.component';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-bus-card',
	standalone: true,
	imports: [FontAwesomeModule, CommonModule],
	templateUrl: './bus-card.component.html',
	styleUrl: './bus-card.component.css'
})
export class BusCardComponent implements OnInit{
	//Icons
	faBus = faBus;
	faTrash = faTrash;
	faPen = faPen;

	@Input() busId: number = 0;
	@Input() licencePlate: string = '';
  	@Input() routes: string[] = [];

	@Output() busDeleted = new EventEmitter<string>();

	public toggledDropdown : boolean = false;

	constructor(private busService : BusService,
		private toast : NgToastService,
		private modalService : NgbModal
	){}

	ngOnInit(): void {}

	public deleteBus(busId: number, event : Event): void {
		event.stopPropagation();

		const modalRef = this.modalService.open(
			  WaringnComponent,
			  { backdrop: 'static', keyboard: true }
			);
		
		modalRef.componentInstance.confirmation.subscribe(
			() => {
				this.busService.deleteBus(busId).subscribe(response => {
					console.log(response);
					this.busDeleted.emit();
				});
			}
		)
	}

	public toggleDropdown() : void {
		this.toggledDropdown = !this.toggledDropdown;
	}
}
