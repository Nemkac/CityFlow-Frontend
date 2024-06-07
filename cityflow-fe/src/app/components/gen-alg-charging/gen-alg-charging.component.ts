import { Component, OnInit } from '@angular/core';
import { GeneticAlgorithmOutput } from '../../models/geneticAlgorithmOutput';
import { GenAlgChargeService } from '../../service/gen_alg_charge.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gen-alg-charging',
  standalone: true,
  imports: [NgFor,FormsModule,CommonModule],
  templateUrl: './gen-alg-charging.component.html',
  styleUrl: './gen-alg-charging.component.css'
})
export class GenAlgChargingComponent implements OnInit{
  geneticOutputFull !: GeneticAlgorithmOutput[];

  constructor(private genService:GenAlgChargeService) {}

  ngOnInit(): void {
    this.getGeneticOutput();
  }

  getGeneticOutput(){
    this.genService.getChargingPlan().subscribe(
      (result) => {
        this.geneticOutputFull = result;
        console.log(this.geneticOutputFull);
      }
    )
    console.log('niga');
  }

}
