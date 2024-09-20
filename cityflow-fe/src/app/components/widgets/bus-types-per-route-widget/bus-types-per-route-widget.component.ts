import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import ApexCharts, { ApexOptions } from 'apexcharts'
import { Widget } from '../../../models/widget';
import { RouteAdministratorService } from '../../../service/route-administrator.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bus-types-per-route-widget',
  standalone: true,
  imports: [],
  templateUrl: './bus-types-per-route-widget.component.html',
  styleUrl: './bus-types-per-route-widget.component.css'
})
export class BusTypesPerRouteWidgetComponent implements OnInit{
  
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

  public loadChart(): void {
    // const totalBudget = this.budgets.reduce((acc, current) => acc + current, 0);
    // const percentages = this.budgets.map(budget => parseFloat((budget / totalBudget * 100).toFixed(2)));
  
    const options: ApexOptions = {
      colors: ["#E6C79C", "#7389AE"],
      series: [
        {
          name: "Electric bus",
          color: "#E6C79C",
          data: [
            { x: "1", y: 231 },
            { x: "2", y: 122 },
            { x: "3", y: 63 },
            { x: "4a", y: 421 },
            { x: "4b", y: 122 },
            { x: "5", y: 323 },
            { x: "6", y: 111 },
            { x: "7a", y: 231 },
            { x: "7b", y: 122 },
            { x: "8", y: 63 },
            { x: "12", y: 421 },
            { x: "14", y: 122 },
            { x: "21", y: 323 },
            { x: "22", y: 111 },
            { x: "51", y: 122 },
            { x: "52", y: 323 },
            { x: "54", y: 111 },
            { x: "62", y: 231 },
            { x: "64", y: 122 },
            { x: "71", y: 63 },
            { x: "72", y: 421 },
            { x: "74", y: 122 },
            { x: "77", y: 323 },
          ],
        },
        {
          name: "Social media",
          color: "#7389AE",
          data: [
            { x: "1", y: 232 },
            { x: "2", y: 113 },
            { x: "3", y: 341 },
            { x: "4a", y: 224 },
            { x: "4b", y: 522 },
            { x: "5", y: 411 },
            { x: "6", y: 243 },
            { x: "7a", y: 232 },
            { x: "7b", y: 113 },
            { x: "8", y: 341 },
            { x: "12", y: 224 },
            { x: "14", y: 522 },
            { x: "21", y: 411 },
            { x: "22", y: 243 },
            { x: "51", y: 232 },
            { x: "52", y: 113 },
            { x: "54", y: 341 },
            { x: "62", y: 224 },
            { x: "64", y: 522 },
            { x: "71", y: 411 },
            { x: "72", y: 243 },
            { x: "74", y: 232 },
            { x: "77", y: 113 },
          ],
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
  
    const chart = new ApexCharts(document.querySelector('#column-chart'), options);
    chart.render();
  }
}
