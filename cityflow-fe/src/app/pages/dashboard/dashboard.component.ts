import { Component } from '@angular/core';
import { BusesWidgetComponent } from "../../components/widgets/buses-widget/buses-widget.component";
import { RoutesWidgetComponent } from "../../components/widgets/routes-widget/routes-widget.component";
import { StationsCountWidgetComponent } from "../../components/widgets/stations-count-widget/stations-count-widget.component";
import { BusTypesPerRouteWidgetComponent } from "../../components/widgets/bus-types-per-route-widget/bus-types-per-route-widget.component";
import { StationsCountPerRouteWidgetComponent } from "../../components/widgets/stations-count-per-route-widget/stations-count-per-route-widget.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BusesWidgetComponent, RoutesWidgetComponent, StationsCountWidgetComponent, BusTypesPerRouteWidgetComponent, StationsCountPerRouteWidgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
