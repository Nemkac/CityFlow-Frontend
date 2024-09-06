import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { BusServicing } from '../../models/busServicing';
import { ServiceAdminService } from '../../service/service-admin.service';


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
  confirmedServicing: any = null;
  

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


  handleClick(servicing: any) {
    if (this.confirmedServicing === servicing) {
      // If the user already confirmed, call the method to report the servicing
      this.reportServicing(servicing);
    } else if (this.selectedServicing === servicing) {
      // On second click (confirmation click)
      this.confirmedServicing = servicing;
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


}
