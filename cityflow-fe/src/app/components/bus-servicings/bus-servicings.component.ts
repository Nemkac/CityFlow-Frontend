import { Component, inject, NgModule, OnInit } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { BusServicing } from '../../models/busServicing';
import { ServiceAdminService } from '../../service/service-admin.service';
import { Router } from '@angular/router';
import { NgToastModule, ToasterPosition } from 'ng-angular-popup'
import { NgToastService } from 'ng-angular-popup'; 
import { TransPipePipe } from '../../trans-pipe.pipe';


@Component({
  selector: 'app-bus-servicings',
  standalone: true,
  imports: [NgFor,FormsModule,NgClass,NgToastModule,TransPipePipe],
  templateUrl: './bus-servicings.component.html',
  styleUrl: './bus-servicings.component.css'
})
export class BusServicingsComponent implements OnInit{

  pastServicings!:BusServicing[];
  futureServicings!:BusServicing[];
  ToasterPosition = ToasterPosition;
  private = inject(NgToastService); //inject the service

  selectedServicing: any = null;  

  constructor(private serviceAdminService:ServiceAdminService,
              private router : Router,
              private toast:NgToastService ){}
  
  ngOnInit(): void {
    this.getPastServicings();
    this.getFutureServicings();
    if(sessionStorage.getItem('keyServicer') == '0') {
      window.location.reload();
      sessionStorage.setItem('keyServicer','1');
    }
  }

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
      this.reportServicing(servicing);
      if(localStorage.getItem('lang') == 'eng') {
      this.toast.success("Alleged past servicing successfully reported. ", "SUCCESS", 5000);
      } else {
        this.toast.success("Неверодостојно забележен сервис успешно уклоњен ", "Успешно", 5000);
      }
    } else {
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
