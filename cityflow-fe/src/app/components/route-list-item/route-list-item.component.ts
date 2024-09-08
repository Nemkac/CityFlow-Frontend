import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoutesService } from '../../service/routes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup'
import { User } from '../../models/user';
import { SearchDTO } from '../../dtos/searchDTO';
import { AuthService } from '../../service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WaringnComponent } from '../modals/waringn/waringn.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-route-list-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  @Input() routeType : string = '';

  @Output() routeDeleted = new EventEmitter<void>();

  public toggledDropdown : boolean = false;

  public destinations : string = '';

  token : string | null = sessionStorage.getItem('token');
  loggedUser! : User;
  loggedUserRole : string  = '';

  constructor(private routeService: RoutesService,
              private toast: NgToastService,
              private modalService : NgbModal,
              private authService: AuthService){}

  ngOnInit(): void {
    this.fetchUser();
    this.getDestinations()
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

  public getDestinations() : void {
    this.routeService.getDestinations(this.routeId).subscribe(
      (response : any) => {
        this.destinations = response;
      },
      (error : HttpErrorResponse) => {
        console.log("Error while fetching route destinations, ", error.message);
      }
    )
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

  public toggleDropdown(event : Event) : void {
    event.stopPropagation();
    this.toggledDropdown = !this.toggledDropdown;
  }

}
