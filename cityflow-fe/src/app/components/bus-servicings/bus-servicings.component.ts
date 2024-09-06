import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { BusServicing } from '../../models/busServicing';
import { ServiceAdminService } from '../../service/service-admin.service';


@Component({
  selector: 'app-bus-servicings',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './bus-servicings.component.html',
  styleUrl: './bus-servicings.component.css'
})
export class BusServicingsComponent implements OnInit{

  pastServicings!:BusServicing[];
  futureServicings!:BusServicing[];

  constructor(private serviceAdminService:ServiceAdminService){}
  
  ngOnInit(): void {
    this.getPastServicings();
    this.getFutureServicings()
  }

  // TODO: vidi da sortiras po datumu
  getPastServicings(){
    this.serviceAdminService.getPastServices().subscribe(
      (pastServicings) => {
        this.pastServicings = pastServicings;
      }
    )
    console.log(this.pastServicings);
  }

  getFutureServicings(){
    this.serviceAdminService.getFutureServices().subscribe(
      (futureServicings) => {
        this.futureServicings = futureServicings;
      }
    )
    console.log(this.futureServicings);
  }

}
