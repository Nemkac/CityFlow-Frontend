import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { MalfunctionReport } from "../models/malfunctionReport";

@Injectable({
    providedIn: 'root'
  })
export class DriverService {
    private apiServerUrl = 'http://localhost:8081'; 

    constructor(private http: HttpClient,
        private router: Router) { }
        
    public testReport():Observable<MalfunctionReport> {
        return this.http.get<MalfunctionReport>(`${this.apiServerUrl}/CityFlow/testReportOnFront`);
    }

    public reportMalfunction(driverId:number,commentary:string):Observable<MalfunctionReport>{
        return this.http.post<MalfunctionReport>(`${this.apiServerUrl}/CityFlow/reportMalfunctionViaDriverId/${driverId}/${commentary}`,null);
    }
}
