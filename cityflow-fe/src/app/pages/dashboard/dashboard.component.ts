import { Component, OnInit } from '@angular/core';
import { BusesWidgetComponent } from "../../components/widgets/buses-widget/buses-widget.component";
import { RoutesWidgetComponent } from "../../components/widgets/routes-widget/routes-widget.component";
import { StationsCountWidgetComponent } from "../../components/widgets/stations-count-widget/stations-count-widget.component";
import { BusTypesPerRouteWidgetComponent } from "../../components/widgets/bus-types-per-route-widget/bus-types-per-route-widget.component";
import { StationsCountPerRouteWidgetComponent } from "../../components/widgets/stations-count-per-route-widget/stations-count-per-route-widget.component";
import { RouteAdministratorService } from '../../service/route-administrator.service';
import { RouteAdministrator } from '../../models/routeAdministrator';
import { HttpErrorResponse } from '@angular/common/http';
import { WidgetService } from '../../service/widget.service';
import { Widget } from '../../models/widget';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddWidgetModalComponent } from '../../components/modals/add-widget-modal/add-widget-modal.component';
import { NgToastService } from 'ng-angular-popup';
import { WaringnComponent } from '../../components/modals/waringn/waringn.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BusesWidgetComponent, RoutesWidgetComponent, StationsCountWidgetComponent, BusTypesPerRouteWidgetComponent, StationsCountPerRouteWidgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  public adminWidgets : Widget[] = [];

  constructor(private routeAdministratorService : RouteAdministratorService,
    private widgetService : WidgetService,
    private modalSerivce : NgbModal,
    private toast : NgToastService
  ){}

  ngOnInit(): void {
    this.getRouteAdministrator();
  }

  public getRouteAdministrator() : void {
    this.routeAdministratorService.getByUser().subscribe(
      (response : RouteAdministrator) => {
        this.adminWidgets = response.widgets;
        console.log("ADMINOVI: ", this.adminWidgets);
      },
      (error : HttpErrorResponse) => {
        console.log("Error while fetching route administrator, ", error);
      }
    )
  }

  public addNewWidget() : void {
    const modalRef = this.modalSerivce.open(
      AddWidgetModalComponent,
      { backdrop : 'static', keyboard : true }
    );

    modalRef.componentInstance.adminWidgets = this.adminWidgets;
    modalRef.componentInstance.widgetsAdded.subscribe(
      (response : string) => {
        this.getRouteAdministrator();
        this.toast.success({detail: "Success!" ,summary:`${response}`});
      }
    );
  }

  public handleWidgetRemoved() : void {
    const modalRef = this.modalSerivce.open(
      WaringnComponent,
      { backdrop : 'static', keyboard : true }
    );

    modalRef.componentInstance.confirmation.subscribe(
      () => {
        this.getRouteAdministrator();
        this.toast.success({detail: "Success!" ,summary:"Widget successfully deleted!"});
      }
    )
  }
}
