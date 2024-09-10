import { Component, OnInit } from '@angular/core';
import { ServiceAdminService } from '../../service/service-admin.service';
import { MalfunctionData } from '../../models/malfunctionData';
import { NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-malfunction-data',
  standalone: true,
  imports: [NgFor,FormsModule,NgClass],
  templateUrl: './malfunction-data.component.html',
  styleUrl: './malfunction-data.component.css'
})
export class MalfunctionDataComponent implements OnInit{
  malfunctionData !: MalfunctionData[];

  constructor(private adminService:ServiceAdminService){}

  ngOnInit(): void {
    this.fetchMalfunctionData();
  }

fetchMalfunctionData(){
  this.adminService.getMalfunctionData().subscribe(
    (data) => {
      this.malfunctionData = data;
      console.log(data);
    }
  ) 
}

}
