import { Component, inject, OnInit } from '@angular/core';
import { GeneticAlgorithmOutput } from '../../models/geneticAlgorithmOutput';
import { GenAlgChargeService } from '../../service/gen_alg_charge.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { NgToastModule, ToasterPosition } from 'ng-angular-popup'
import { NgToastService } from 'ng-angular-popup'; 

@Component({
  selector: 'app-gen-alg-charging',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule,FontAwesomeModule,NgToastModule],
  templateUrl: './gen-alg-charging.component.html',
  styleUrls: ['./gen-alg-charging.component.css'] // fixed typo: styleUrl -> styleUrls
})
export class GenAlgChargingComponent implements OnInit {
  geneticOutputFull!: GeneticAlgorithmOutput[];
  isLoading = true; // Added loading state
  faCalculator = faCalculator;
  ToasterPosition = ToasterPosition;
  private = inject(NgToastService); //inject the service


  constructor(private genService: GenAlgChargeService,
              private toast:NgToastService
  ) {}

  ngOnInit(): void {
    this.getGeneticOutput();
    if(sessionStorage.getItem('keyCharger') == '0') {
      window.location.reload();
      sessionStorage.setItem('keyCharger','1');
    }
  }

  getGeneticOutput(): void {
    this.genService.getChargingPlan().subscribe(
      (result) => {
        if (result.length != 0) {
          this.geneticOutputFull = result;
          console.log('Prikazivanje vec izvrsenog genetskog algoritma');
          this.isLoading = false;
        } else {
          this.genService.runGeneticAlgorithm().subscribe(
            (result1) => {
              this.geneticOutputFull = result1;
              console.log('Genetski algoritam uspesno izvrsen');
              this.isLoading = false;
            },
            (error) => {
              console.error('Greska sa izvrsavanjem genetskog algoritma', error);
              this.isLoading = false;
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching charging plan', error);
        this.isLoading = false; 
      }
    );
  }

  regenerateChargingPlan(){
    this.isLoading = true;
    this.genService.runGeneticAlgorithm().subscribe(
      (result) => {
        this.geneticOutputFull = result;
        console.log('Genetski algoritam uspesno izvrsen');
        this.isLoading = false;
        this.toast.success("Charging plan successfully generated using genetic algorithm ", "SUCCESS", 5000)
      },
      (error) => {
        console.error('Greska sa izvrsavanjem genetskog algoritma', error);
        this.isLoading = false;
      }
    );
  }
}import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

