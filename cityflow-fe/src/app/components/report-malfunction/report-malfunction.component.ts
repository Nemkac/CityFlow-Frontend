import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../service/driver.service';
import { ServiceRanking } from '../../models/serviceRanking';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Driver } from '../../models/driver';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-report-malfunction',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './report-malfunction.component.html',
  styleUrl: './report-malfunction.component.css'
})
export class ReportMalfunctionComponent implements OnInit{

  commentary!:string;
  driver!:Driver
  priority: number = 3; // Default value
  token = localStorage.getItem('token');
  loggedUser! : User;
  sessionValue !: string ;
  sessionCounter : number = 0;



  constructor(private driverService:DriverService,
              private authService:AuthService,
              private globalService:GlobalService
  ) {}
  ngOnInit(): void {
    if(sessionStorage.getItem('keyDriver') == '0') {
      window.location.reload();
      sessionStorage.setItem('keyDriver','1');
    }
  }

  testReport(){
    this.driverService.testReport().subscribe(
      (report) => {
        console.log("Report :",report);
      }
    )
  }

  reportMalfunction(driverId:number){
    if(this.token != null){
      this.authService.getUserFromToken(this.token).subscribe(
        (response : User) => {
          this.loggedUser = response;
          this.driverService.reportMalfunction(response.id,this.commentary,this.priority).subscribe(
            (report) => {
              console.log("Report : ", report);
            }
          )
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          console.log('Error fetching user data:\n', error.message);
        }
      )
    }
  }



}
