import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { BusServicing } from '../../models/busServicing';
import { ServiceAdminService } from '../../service/service-admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bus-servicings',
  standalone: true,
  imports: [NgFor,FormsModule,NgClass],
  templateUrl: './bus-servicings.component.html',
  styleUrl: './bus-servicings.component.css'
})
export class BusServicingsComponent implements OnInit{

  pastServicings!:BusServicing[];
  futureServicings!:BusServicing[];

  selectedServicing: any = null;  

  constructor(private serviceAdminService:ServiceAdminService,
              private router : Router ){}
  
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


  handleClick(servicing: any) {
    if (this.selectedServicing === servicing) {
      // On second click (confirmation click)
      this.reportServicing(servicing);
    } else {
      // On first click, highlight the card (show confirmation message)
      this.selectedServicing = servicing;
    }
  }


  reportServicing(busServicing : BusServicing){
    this.serviceAdminService.reportPastServicing(this.selectedServicing.id).subscribe(
      (pastServicings) => {
        this.pastServicings = pastServicings;
        console.log('nigaz');

      }
    )
  }

  handlePriorityClick() {
    this.router.navigate(['/busesServiceRankings']);
  }


}
