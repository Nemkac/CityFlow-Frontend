import { Component, OnInit } from '@angular/core';
import { ServiceAdminService } from '../../service/service-admin.service';
import { ServiceRanking } from '../../models/serviceRanking';
import { Bus } from '../../models/bus';
import { NgFor } from '@angular/common';
import { AppComponent } from '../../app.component';


export class AppModule{}

@Component({
  selector: 'app-bus-service-rankings',
  standalone: true,
  imports: [NgFor],
  templateUrl: './bus-service-rankings.component.html',
  styleUrl: './bus-service-rankings.component.css'
})
export class BusServiceRankingsComponent implements OnInit{

  rankings!:ServiceRanking[];

  constructor(private serviceAdminService:ServiceAdminService
  ) {}
  ngOnInit(): void {
    this.getRankings();
  }

  getRankings(){
    this.serviceAdminService.getRankings().subscribe(
      (serviceRankings) => {
        this.rankings = serviceRankings;
        console.log("stae");
      }
    )
  }

  moveBusUpByRank(busId:number){
    this.serviceAdminService.moveBusUpByRank(busId).subscribe(
      (rankings) => {
        console.log("Rankings : ", rankings);
      }
    )
    window.location.reload;
  }

  
  moveDown(busId:number){
    this.serviceAdminService.moveBusDownByRank(busId).subscribe(
      (rankings) => {
        console.log("Rankings : ", rankings);
      }
    )
    window.location.reload;
  }

  addTimeSlots(){

  }


}
