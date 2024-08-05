import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateStationComponent } from '../../components/modals/create-station/create-station.component';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.css'
})
export class StationsComponent {

  faSearch = faSearch;

  constructor(private modalService : NgbModal){}

  public openCreateStationForm(){
    this.modalService.open(
      CreateStationComponent,
      { backdrop : 'static', keyboard : true }
    );
  }
}
