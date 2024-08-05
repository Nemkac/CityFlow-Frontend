import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoutesService } from '../../service/routes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup'
import { User } from '../../models/user';
import { SearchDTO } from '../../dtos/searchDTO';
import { AuthService } from '../../service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WaringnComponent } from '../modals/waringn/waringn.component';

@Component({
  selector: 'app-route-list-item',
  standalone: true,
  imports: [],
  templateUrl: './route-list-item.component.html',
  styleUrl: './route-list-item.component.css'
})
export class RouteListItemComponent implements OnInit{
  //Inputs
  @Input() routeId: number = 0;
  @Input() routeName: string = '';
  @Input() startTime: string = '';
  @Input() endTime: string = '';
  @Input() isUser: boolean = false;

  @Output() routeDeleted = new EventEmitter<void>();

  token : string | null = localStorage.getItem('token');
  loggedUser! : User;
  loggedUserRole : string  = '';

  constructor(private routeService: RoutesService,
              private toast: NgToastService,
              private modalService : NgbModal,
              private authService: AuthService){}

  ngOnInit(): void {
    this.fetchUser();
  }

  public fetchUser() : void {
    if(this.token != null){
      this.authService.getUserFromToken(this.token).subscribe(
        (response : User) => {
          this.loggedUser = response;
          this.loggedUserRole = this.loggedUser.roles;
          console.log(this.loggedUserRole);
        },
        (error: HttpErrorResponse) => {
          console.log('Error fetching user data:\n', error.message);
        }
      )
    }
  }

  public showRoute(routeId : number) : void {
    this.routeService.showRoute(routeId, this.loggedUser.username, this.routeName);
  }

  public deleteRoute(routeId: number, event : Event): void {
    event.stopPropagation();

    const modalRef = this.modalService.open(
		  WaringnComponent,
		  { backdrop: 'static', keyboard: true }
		);

    modalRef.componentInstance.confirmation.subscribe(
      () => {
          this.routeService.deleteRoute(routeId).subscribe(
            response => {
              console.log(response);
              this.routeDeleted.emit();
              console.log('deleted');
            }
        );
      } 
    )
  }

}
