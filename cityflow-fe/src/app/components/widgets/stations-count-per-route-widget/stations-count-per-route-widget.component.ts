import { Component, EventEmitter, Input, Output } from '@angular/core';
import ApexCharts, { ApexOptions } from 'apexcharts'
import { Widget } from '../../../models/widget';
import { RouteAdministratorService } from '../../../service/route-administrator.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RoutesService } from '../../../service/routes.service';


@Component({
  selector: 'app-stations-count-per-route-widget',
  standalone: true,
  imports: [],
  templateUrl: './stations-count-per-route-widget.component.html',
  styleUrl: './stations-count-per-route-widget.component.css'
})
export class StationsCountPerRouteWidgetComponent {
  @Input() widget? : Widget;

  @Output() widgetRemoved = new EventEmitter<string>();

  public routes : any[] = [];

  constructor(private routeAdministratorService : RouteAdministratorService,
    private routeService : RoutesService
  ){}

  ngOnInit(): void {
    this.getAllRoutes()
  }

  public removeWidgetFromDashboard() : void {
    if(this.widget){
      this.routeAdministratorService.removeWidgetFromDashboard(this.widget).subscribe(
        (response : string) => {
          console.log("Widget successfully removed from dashboard");
          this.widgetRemoved.emit(response);
        },
        (error : HttpErrorResponse) => {
          console.log("Error while deleting widget from dashboard, ", error.message);
        }
      )
    }
  }

  public getAllRoutes() : void {
    this.routeService.getAll().subscribe(
      (response : any) => {
        this.routes = response;
        this.loadChart(this.routes);
      },
      (error : HttpErrorResponse) => {
        console.log("Error while fetching routes for stations count per route widget!", error);
      }
    )
  }

  public loadChart(routes : any[]): void {
    const routeStationsData = routes.map(route => ({
      x: route.name,
      y: route.stations.length + 2
    }));

    const options: ApexOptions = {
      colors: ["#E6C79C", "#7389AE"],
      series: [
        {
          name: "Number of stations",
          color: "#025864",
          data: routeStationsData,
        },
      ],
      chart: {
        type: "bar",
        height: "320px",
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%",
          borderRadiusApplication: "end",
          borderRadius: 8,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      states: {
        hover: {
          filter: {
            type: "darken",
            value: 1,
          },
        },
      },
      stroke: {
        show: true,
        width: 0,
        colors: ["transparent"],
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -14
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
      },
      xaxis: {
        floating: false,
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
          }
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
    };
  
    const chart = new ApexCharts(document.querySelector('#stations-count-column-chart'), options);
    chart.render();
  }
}
