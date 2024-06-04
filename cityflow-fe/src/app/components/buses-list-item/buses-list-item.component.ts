import { Component, Input } from '@angular/core';
import { RoutesService } from '../../service/routes.service';
import { NgToastService } from 'ng-angular-popup';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash, faBus } from '@fortawesome/free-solid-svg-icons';
import { deleteBusFromRouteDTO } from '../../dtos/deleteBusFromRouteDTO';

@Component({
  selector: 'app-buses-list-item',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './buses-list-item.component.html',
  styleUrl: './buses-list-item.component.css'
})
export class BusesListItemComponent {
  //Inputs
  @Input() routeId : number = 0;
  @Input() busId: number = 0;
  @Input() licencePlate: string = '';

  //Icons
  faPen = faPen;
  faTrash = faTrash;
  faBus = faBus;

  constructor(private routeService: RoutesService,
              private toast: NgToastService){}

  public deleteBusFromRoute(routeId: number, busId : number): void {
    const dto : deleteBusFromRouteDTO = {
      routeId : routeId,
      busId : busId
    }
    this.routeService.deleteBusFromRoute(dto).subscribe(response => {
      console.log(response);
      this.toast.success({ detail: "SUCCESS", summary: 'Bus successfully deleted from route!' });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }
}
