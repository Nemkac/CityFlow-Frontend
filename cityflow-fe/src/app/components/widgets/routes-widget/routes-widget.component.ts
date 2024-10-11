import { Component, EventEmitter, Input, Output } from '@angular/core';
import ApexCharts, { ApexOptions } from 'apexcharts'
import { Widget } from '../../../models/widget';
import { RouteAdministratorService } from '../../../service/route-administrator.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RoutesService } from '../../../service/routes.service';
import { AllBusTypesDTO } from '../../../models/allBusesWithTypes';


@Component({
  selector: 'app-routes-widget',
  standalone: true,
  imports: [],
  templateUrl: './routes-widget.component.html',
  styleUrl: './routes-widget.component.css'
})
export class RoutesWidgetComponent {
  @Input() widget? : Widget;

  @Output() widgetRemoved = new EventEmitter<string>();

  constructor(private routeAdministratorService : RouteAdministratorService,
    private routeSerivce : RoutesService
  ){}

  ngOnInit(): void {
    this.fetchRoutes();
  }

  public fetchRoutes() : void {
    this.routeSerivce.getAll().subscribe(
      (response : any[]) => {
        this.loadChart(response);
      },
      (error : HttpErrorResponse) => {
        console.log("Error while fetching routes for routes widget!", error);
      }
    )
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

  loadChart(routes : any[]): void {
    // const totalBudget = this.budgets.reduce((acc, current) => acc + current, 0);
    // const percentages = this.budgets.map(budget => parseFloat((budget / totalBudget * 100).toFixed(2)));
    const totalRoutes = routes.length;
    const cityRoutesCount = routes.filter(route => route.type === "CITY_ROUTE").length;
    const suburbanRoutesCount = routes.filter(route => route.type === "SUBURBAN_ROUTE").length;

    const cityRoutesPercentage = (cityRoutesCount / totalRoutes) * 100;
    const suburbanRoutesPercentage = (suburbanRoutesCount / totalRoutes) * 100;

    const options: ApexOptions = {
      series: [cityRoutesPercentage, suburbanRoutesPercentage],
      colors: ["#E6C79C", "#7389AE"],
      chart: {
        height: 500,
        width: "90%",
        type: 'pie',
      },
      stroke: {
        colors: ["white"],
        lineCap: "butt",
      },
      labels: ['City routes', 'Suburban routes'],
      tooltip: {
        enabled: true,
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: 'Poppins, sans-serif',
          fontSize: '10px',
        }
      },
      legend: {
        position: 'bottom',
        fontSize: '10px',
        fontFamily: 'Poppins, sans-serif'
      }
    };
  
    const chart = new ApexCharts(document.querySelector('#pie-chart-routes'), options);
    chart.render();
  }
}
