import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import ApexCharts, { ApexOptions } from 'apexcharts'
import { Widget } from '../../../models/widget';
import { RouteAdministratorService } from '../../../service/route-administrator.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AllBusTypesDTO } from '../../../models/allBusesWithTypes';
import { BusService } from '../../../service/bus.service';


@Component({
  selector: 'app-buses-widget',
  standalone: true,
  imports: [],
  templateUrl: './buses-widget.component.html',
  styleUrl: './buses-widget.component.css'
})
export class BusesWidgetComponent implements OnInit{

  @Input() widget? : Widget;

  @Output() widgetRemoved = new EventEmitter<string>();

  public allBuses? : AllBusTypesDTO;

  constructor(private routeAdministratorService : RouteAdministratorService,
    private busService : BusService
  ){}

  ngOnInit(): void {
    this.fetchAllBuses()
  }

  public fetchAllBuses() : void {
    this.busService.getAllWithTypes().subscribe(
      (response : AllBusTypesDTO) => {
        this.allBuses = response;
        console.log("ALL BUSES ON WIDGET: ", this.allBuses)
        this.loadChart(this.allBuses)
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

  public loadChart(buses : AllBusTypesDTO): void {
    const totalBuses = buses.buses.length;
    const totalIceBuses = buses.iceBuses.length;
    const totalElectricBuses = buses.electricBuses.length;
  
    const total = totalBuses + totalIceBuses + totalElectricBuses;
    const busesPercentage = (totalBuses / total) * 100;
    const iceBusesPercentage = (totalIceBuses / total) * 100;
    const electricBusesPercentage = (totalElectricBuses / total) * 100;
  
    const options: ApexOptions = {
      series: [electricBusesPercentage, iceBusesPercentage],
      colors: ["#E6C79C", "#7389AE"],
      chart: {
        height: 700,
        width: "90%",
        type: 'pie',
      },
      stroke: {
        colors: ["white"],
        lineCap: "butt",
      },
      labels: ['Electric buses', 'ICE Buses'],
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
  
    const chart = new ApexCharts(document.querySelector('#pie-chart'), options);
    chart.render();
  }
}
