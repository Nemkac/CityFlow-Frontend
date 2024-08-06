import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-station-card',
  standalone: true,
  imports: [],
  templateUrl: './station-card.component.html',
  styleUrl: './station-card.component.css'
})
export class StationCardComponent {

  @Input() address : string = ''
  @Input() latitude : number = 0;
  @Input() longitude : number = 0;

  @Output() stationDeleted = new EventEmitter<void>();

  public deleteStation() : void {}
}
