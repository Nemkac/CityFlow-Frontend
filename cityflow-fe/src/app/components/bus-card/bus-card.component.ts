import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-bus-card',
	standalone: true,
	imports: [FontAwesomeModule],
	templateUrl: './bus-card.component.html',
	styleUrl: './bus-card.component.css'
})
export class BusCardComponent implements OnInit{
	//Icons
	faBus = faBus;
	faTrash = faTrash;
	faPen = faPen;

	@Input() busId: number = 0;
  	@Input() routes: string[] = [];

	ngOnInit(): void {
	}
}
