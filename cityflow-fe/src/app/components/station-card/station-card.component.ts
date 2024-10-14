import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewStationComponent } from '../modals/view-station/view-station.component';
import { EditStationComponent } from '../modals/edit-station/edit-station.component';

@Component({
  selector: 'app-station-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './station-card.component.html',
  styleUrl: './station-card.component.css'
})
export class StationCardComponent {

  @Input() station : any;
  @Input() address : string = ''
  @Input() latitude : number = 0;
  @Input() longitude : number = 0;

  @Output() stationDeleted = new EventEmitter<void>()
  @Output() stationEdited = new EventEmitter<void>()

  public toggledDropdown : boolean = false;

  constructor(private modalService : NgbModal){}

  public deleteStation() : void {}

  public toggleDropdown() : void {
    this.toggledDropdown = !this.toggledDropdown;
  }

  public viewStation() : void {
    const modalRef = this.modalService.open(
      ViewStationComponent,
      { backdrop : 'static', keyboard : true }
    );

    modalRef.componentInstance.address = this.address;
    modalRef.componentInstance.latitude = this.latitude;
    modalRef.componentInstance.longitude = this.longitude;
  }

  public editStation() : void {
    const modalRef = this.modalService.open(
      EditStationComponent,
      { backdrop : 'static', keyboard : true }
    );
    this.toggledDropdown = !this.toggledDropdown;
    modalRef.componentInstance.address = this.address;
    modalRef.componentInstance.latitude = this.latitude;
    modalRef.componentInstance.longitude = this.longitude;
    modalRef.componentInstance.station = this.station;

    modalRef.componentInstance.stationEdited.subscribe(
      () => {
        this.stationEdited.emit();
      }
    )

  }
}
