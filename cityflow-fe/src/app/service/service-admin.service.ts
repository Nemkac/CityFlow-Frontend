import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ServiceRanking } from "../models/serviceRanking";
import { BusServicing } from "../models/busServicing";
import { TimeSlot } from "../models/timeSlot";



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

    public bookServiceViaDate(date:Date):Observable<BusServicing[]>{
        return this.http.put<BusServicing[]>(`${this.apiServerUrl}/CityFlow/bookServicesOneSlotViaDate`,date);
    }

    public bookService(timeSlot:TimeSlot):Observable<BusServicing[]>{
        return this.http.put<BusServicing[]>(`${this.apiServerUrl}/CityFlow/bookServicesOneSlot`,timeSlot);
    }
}