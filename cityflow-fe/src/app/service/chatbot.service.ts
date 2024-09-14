import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { LandmarksOutput } from "../models/chat-bot-models/landmarksOutput";
import { LandmarksInput } from "../models/chat-bot-models/landmarksInput";
import { RoutesInput } from "../models/chat-bot-models/routesInput";
import { RoutesOutput } from "../models/chat-bot-models/routesOutput";
import { StopsInput } from "../models/chat-bot-models/stopsInput";
import { StopsOutput } from "../models/chat-bot-models/stopsOutput";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
  })
export class ChatbotService {

    private apiServerUrl = 'http://localhost:8080'; 

    constructor(private http: HttpClient,
        private router: Router) { }

    
    public searchLandmarks(input:LandmarksInput):Observable<LandmarksOutput[]> {
        return this.http.post<LandmarksOutput[]>(`${this.apiServerUrl}/searchLandmarks1`,input);
    }

    public searchRoutes(input:RoutesInput):Observable<RoutesOutput[]> {
        return this.http.post<RoutesOutput[]>(`${this.apiServerUrl}/searchRoutes2`,input);
    }

    public searchStops(input:StopsInput):Observable<StopsOutput[]> {
        return this.http.post<StopsOutput[]>(`${this.apiServerUrl}/searchStops3`,input);
    }
    

}