import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ServiceRanking } from "../models/serviceRanking";



@Injectable({
    providedIn:'root'
})
export class ServiceAdminService{
    private apiServerUrl = 'http://localhost:8081';

    constructor(private http:HttpClient,
        private router : Router
    ) {}

    public getRankings():Observable<ServiceRanking[]>{
        return this.http.get<ServiceRanking[]>(`${this.apiServerUrl}/CityFlow/getServiceUrgencyRankings`);
    }

    public moveBusUpByRank(busId:number):Observable<ServiceRanking[]>{
        return this.http.get<ServiceRanking[]>(`${this.apiServerUrl}/CityFlow/moveBusUpByRank/${busId}`);
    }

    public moveBusDownByRank(busId:number):Observable<ServiceRanking[]>{
        return this.http.get<ServiceRanking[]>(`${this.apiServerUrl}/CityFlow/moveBusDownByRank/${busId}`);
    }
}