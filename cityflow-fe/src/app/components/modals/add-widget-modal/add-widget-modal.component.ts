import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Widget } from '../../../models/widget';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouteAdministratorService } from '../../../service/route-administrator.service';
import { HttpErrorResponse } from '@angular/common/http';
import { WidgetService } from '../../../service/widget.service';

@Component({
  selector: 'app-add-widget-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-widget-modal.component.html',
  styleUrl: './add-widget-modal.component.css'
})
export class AddWidgetModalComponent implements OnInit{

  @Input() adminWidgets : Widget[] = [];
  
  @Output() widgetsAdded = new EventEmitter<string>();

  public widgets : Widget[] = [];
  public availableWidgets : Widget[] =[];
  public selectedWidgets : Widget[] = [];
  
  constructor(public modalService : NgbActiveModal,
    private routeAdministratorService : RouteAdministratorService,
    private widgetService : WidgetService
  ) {}

  ngOnInit(): void {
    this.getAllWidgets();
  }

  public getAllWidgets() : void {
    this.widgetService.getAll().subscribe(
      (response : Widget[]) => {
        this.widgets = response;
        this.availableWidgets = this.widgets.filter(widget => 
          !this.adminWidgets.some(adminWidget => adminWidget.id === widget.id)
        );
      },
      (error : HttpErrorResponse) => {
        console.log("Error while fetching widgets, ", error);
      }
    )
  }

  public addWidgetsToDashboard() : void {
    this.routeAdministratorService.addWidgetsToDashboard(this.selectedWidgets).subscribe(
      (response : string) => {
        this.widgetsAdded.emit(response);
        this.modalService.close();
      },
      (error : HttpErrorResponse) => {
        console.log("Error while adding widgets to dashboard, ", error.message);
      }
    );
  }

  public setActive(selectedWidget: Widget): void {
    const index = this.selectedWidgets.findIndex(widget => widget.id === selectedWidget.id);

    if (index === -1) {
      this.selectedWidgets.push(selectedWidget);
    } else {
      this.selectedWidgets.splice(index, 1);
    }

    console.log(this.selectedWidgets);
  }

  public isActive(selectedWidget: Widget): boolean {
    const index = this.selectedWidgets.findIndex(widget => widget.id === selectedWidget.id);

    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }
}
