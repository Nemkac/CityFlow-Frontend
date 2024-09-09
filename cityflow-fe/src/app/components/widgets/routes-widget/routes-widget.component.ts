import { Component, EventEmitter, Input, Output } from '@angular/core';
import ApexCharts, { ApexOptions } from 'apexcharts'
import { Widget } from '../../../models/widget';
import { RouteAdministratorService } from '../../../service/route-administrator.service';
import { HttpErrorResponse } from '@angular/common/http';


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

  constructor(private routeAdministratorService : RouteAdministratorService){}

  ngOnInit(): void {
    this.loadChart();
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

  loadChart(): void {
    // const totalBudget = this.budgets.reduce((acc, current) => acc + current, 0);
    // const percentages = this.budgets.map(budget => parseFloat((budget / totalBudget * 100).toFixed(2)));
  
    const options: ApexOptions = {
      series: [50, 50],
      colors: ["#E6C79C", "#7389AE"],
      chart: {
        height: 700,
        width: "100%",
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
