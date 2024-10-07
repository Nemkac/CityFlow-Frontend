import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { BusService } from '../../service/bus.service';
import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WaringnComponent } from '../modals/waringn/waringn.component';
import { CommonModule } from '@angular/common';
import { EditBusModalComponent } from '../modals/edit-bus-modal/edit-bus-modal.component';
import { Bus } from '../../models/bus';

@Component({
	selector: 'app-bus-card',
	standalone: true,
	imports: [FontAwesomeModule, CommonModule],
	templateUrl: './bus-card.component.html',
	styleUrl: './bus-card.component.css'
})
export class BusCardComponent implements OnInit{

	faBus = faBus;
	faTrash = faTrash;
	faPen = faPen;

	@Input() busId: number = 0;
	@Input() licencePlate: string = '';
  	@Input() routes: string[] = [];
	@Input() bus! : any;
	@Input() busType! : string;

	@Output() busDeleted = new EventEmitter<string>();
	@Output() busEdited = new EventEmitter<void>();

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

	public editBus(selectedBus : Bus) : void {
		const modalRef = this.modalService.open(
			EditBusModalComponent,
			{ backdrop : 'static', keyboard : true }
		);
		this.toggledDropdown = !this.toggledDropdown

		modalRef.componentInstance.bus = selectedBus;
		modalRef.componentInstance.busEdited.subscribe(
			() => {
				this.toggledDropdown = false;
				this.busEdited.emit();
			}
		);
	}


}
