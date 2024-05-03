import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../service/driver.service';

@Component({
  selector: 'app-report-malfunction',
  standalone: true,
  imports: [],
  templateUrl: './report-malfunction.component.html',
  styleUrl: './report-malfunction.component.css'
})
export class ReportMalfunctionComponent implements OnInit{
  constructor(private driverService:DriverService) {}
  ngOnInit(): void {}

  testReport(){
    this.driverService.testReport().subscribe(
      (report) => {
        console.log("Niga report :",report);
      }
    )
  }

}
