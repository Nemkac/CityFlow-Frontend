import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { GeneticAlgorithmOutput } from "../models/geneticAlgorithmOutput";

@Injectable({
    providedIn: 'root'
})
export class GenAlgChargeService {
    private apiServerUrl = 'http://localhost:8081'; 

    constructor(private http: HttpClient,
                private router : Router
    ) {
        
    }

    public runGeneticAlgorithm():Observable<GeneticAlgorithmOutput[]>{
        return this.http.get<GeneticAlgorithmOutput[]>(`${this.apiServerUrl}/CityFlow/testGeneticString`);
    }

    public getChargingPlan():Observable<GeneticAlgorithmOutput[]>{
        return this.http.get<GeneticAlgorithmOutput[]>(`${this.apiServerUrl}/CityFlow/getChargingPlan`);
    }
}