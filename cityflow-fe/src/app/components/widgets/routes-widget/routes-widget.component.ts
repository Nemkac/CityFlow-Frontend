import { Component } from '@angular/core';
import ApexCharts, { ApexOptions } from 'apexcharts'


@Component({
  selector: 'app-routes-widget',
  standalone: true,
  imports: [],
  templateUrl: './routes-widget.component.html',
  styleUrl: './routes-widget.component.css'
})
export class RoutesWidgetComponent {
  ngOnInit(): void {
    this.loadChart();
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
