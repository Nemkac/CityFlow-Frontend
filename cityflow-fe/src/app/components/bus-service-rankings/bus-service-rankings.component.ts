import { Component, inject, OnInit } from '@angular/core';
import { ServiceAdminService } from '../../service/service-admin.service';
import { ServiceRanking } from '../../models/serviceRanking';
import { Bus } from '../../models/bus';
import { NgFor } from '@angular/common';
import { AppComponent } from '../../app.component';
import { FormsModule, NgModel } from '@angular/forms';
import { TimeSlot, TimeSlotImpl } from '../../models/timeSlot';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { NgToastModule, ToasterPosition } from 'ng-angular-popup'
import { NgToastService } from 'ng-angular-popup'; 
import { TransPipePipe } from '../../trans-pipe.pipe';




@Component({
  selector: 'app-bus-service-rankings',
  standalone: true,
  imports: [NgFor,FormsModule,FontAwesomeModule,NgToastModule,TransPipePipe],
  templateUrl: './bus-service-rankings.component.html',
  styleUrl: './bus-service-rankings.component.css'
})
export class BusServiceRankingsComponent implements OnInit{

  rankings!:ServiceRanking[];
  timeSlotDate!:Date;

  faCalculator = faCalculator;
  ToasterPosition = ToasterPosition;
  private = inject(NgToastService); //inject the service

  constructor(private serviceAdminService:ServiceAdminService,
              private toast:NgToastService
  ) {}
  ngOnInit(): void {
    this.getRankings();
  }

  getRankings(){
    this.serviceAdminService.getRankings().subscribe(
      (serviceRankings) => {
        this.rankings = serviceRankings;
        this.rankings.sort((a,b) => a.rank - b.rank);
      }
    )
  }

  moveBusUpByRank(busId:number){
    this.serviceAdminService.moveBusUpByRank(busId).subscribe(
      (rankings) => {
        console.log("Rankings : ", rankings);
        //window.location.reload;
        this.getRankings();
      }
    )
  }

  
  moveDown(busId:number){
    this.serviceAdminService.moveBusDownByRank(busId).subscribe(
      (rankings) => {
        console.log("Rankings : ", rankings);
        //window.location.reload;
        this.getRankings();
      }
    )
  }

  addTimeSlotViaDate(timeSlotDate:Date){
    console.log(timeSlotDate);
    this.serviceAdminService.bookServiceViaDate(timeSlotDate).subscribe(
      (services) => {
        console.log(services);
      }
    )
    window.location.reload();
  }

  addTimeSlot(date:Date){
    const timeSlot = new TimeSlotImpl(date, 60);
    this.serviceAdminService.bookService(timeSlot).subscribe(
      (services) => {
        console.log(services);
      }
    )
    this.toast.success("Bus successfully asigned to new added service time slot ", "SUCCESS", 5000)
    setTimeout(() => {
      window.location.reload();
    }, 750);


  }


}
