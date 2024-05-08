import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../service/driver.service';
import { ServiceRanking } from '../../models/serviceRanking';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-malfunction',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './report-malfunction.component.html',
  styleUrl: './report-malfunction.component.css'
})
export class ReportMalfunctionComponent implements OnInit{

  commentary!:string;

  constructor(private driverService:DriverService) {}
  ngOnInit(): void {}

  testReport(){
    this.driverService.testReport().subscribe(
      (report) => {
        console.log("Report :",report);
      }
    )
  }

  reportMalfunction(driverId:number){
    this.driverService.reportMalfunction(driverId,this.commentary).subscribe(
      (report) => {
        console.log("Report : ", report);
      }
    )
  }

}
