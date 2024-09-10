import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ServiceRanking } from "../models/serviceRanking";
import { BusServicing } from "../models/busServicing";
import { TimeSlot } from "../models/timeSlot";
import { MalfunctionData } from "../models/malfunctionData";



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

    public getPastServices():Observable<BusServicing[]>{
        return this.http.get<BusServicing[]>(`${this.apiServerUrl}/CityFlow/getPastServicings`)
    }

    public getFutureServices():Observable<BusServicing[]>{
        return this.http.get<BusServicing[]>(`${this.apiServerUrl}/CityFlow/getFutureServicings`)
    }

    public reportPastServicing(servicingId:number):Observable<BusServicing[]>{
        return this.http.get<BusServicing[]>(`${this.apiServerUrl}/CityFlow/reportServicing/${servicingId}`);
    }

    public calculateMalfunctionData():void{
        this.http.get(`${this.apiServerUrl}/CityFlow/fillMalfunctionData`);
    }

    public getMalfunctionData():Observable<MalfunctionData[]>{
        return this.http.get<MalfunctionData[]>(`${this.apiServerUrl}/CityFlow/getMalfunctionData`);
    }
}