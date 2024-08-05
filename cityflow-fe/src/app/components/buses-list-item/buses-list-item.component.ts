import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoutesService } from '../../service/routes.service';
import { NgToastService } from 'ng-angular-popup';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash, faBus } from '@fortawesome/free-solid-svg-icons';
import { deleteBusFromRouteDTO } from '../../dtos/deleteBusFromRouteDTO';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WaringnComponent } from '../modals/waringn/waringn.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-buses-list-item',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './buses-list-item.component.html',
  styleUrl: './buses-list-item.component.css'
})
export class BusesListItemComponent implements OnInit{
  //Inputs
  @Input() routeId : number = 0;
  @Input() busId: number = 0;
  @Input() licencePlate: string = '';

  @Output() busRemovedFromRoute = new EventEmitter<void>()

  //Icons
  faPen = faPen;
  faTrash = faTrash;
  faBus = faBus;

  constructor(private routeService: RoutesService,
    private modalService : NgbModal,
    private toast: NgToastService
  ){}
  
  ngOnInit(): void {}

  async deleteBusFromRoute(routeId: number, busId : number) : Promise<void>{
    const dto : deleteBusFromRouteDTO = {
      routeId : routeId,
      busId : busId
    }

    const modalRef = this.modalService.open(
      WaringnComponent,
      {backdrop: 'static', keyboard : true}
    );

    modalRef.componentInstance.confirmation.subscribe(
      () => {
        this.routeService.deleteBusFromRoute(dto).subscribe(
          (response: any) => {
            console.log(response);
            this.toast.success({ detail: "SUCCESS", summary: 'Bus successfully deleted from route!' });
            this.busRemovedFromRoute.emit();
          },
          (error : HttpErrorResponse) => {
            console.log("Error while deleting bus from route, ", error.message);
            this.toast.error({detail: "Error!", summary: "Error while deleting bus from route!"})
          }
        );  
      }
    );
  }
}
