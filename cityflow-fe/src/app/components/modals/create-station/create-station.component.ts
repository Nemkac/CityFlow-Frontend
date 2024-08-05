import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-station',
  standalone: true,
  imports: [],
  templateUrl: './create-station.component.html',
  styleUrl: './create-station.component.css'
})
export class CreateStationComponent {

  constructor(private modalService : NgbActiveModal){}

  public closeModal(){
    this.modalService.close();
  }
}
