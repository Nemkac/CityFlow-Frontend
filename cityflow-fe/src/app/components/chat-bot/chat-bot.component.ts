import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LandmarksOutput } from '../../models/chat-bot-models/landmarksOutput';
import { LandmarksInput } from '../../models/chat-bot-models/landmarksInput';
import { ChatbotService } from '../../service/chatbot.service';
import { StopsOutput } from '../../models/chat-bot-models/stopsOutput';
import { RoutesOutput } from '../../models/chat-bot-models/routesOutput';
import { RoutesInput } from '../../models/chat-bot-models/routesInput';
import { StopsInput } from '../../models/chat-bot-models/stopsInput';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [NgIf,FormsModule,NgFor],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css'
})
export class ChatBotComponent implements OnInit{

  landmarksOutputList : LandmarksOutput[] = [];
  //landmarkMainArr : string[] = [""];
  landmarkMain !: string;
  landmarkRegion !: string;
  landmarkMinCit !: number;
  landmarkMaxCit !: number;

  routesOutputList : RoutesOutput[] = [];
  //routeDescriptionArr : string[] = [""];
  routeDescription !: string;
  routeDuration !: string;
  departureTime !: string;

  stopsOutputList : StopsOutput[] = []; 
  //specialFeaturesArr : string[] = [""];
  specialFeatures !: string;
  nearbyLandmarks !: string;
  facilities !: string;


  constructor( private chatbotService:ChatbotService ) {  }
  ngOnInit(): void {
    
  }

  runLandmarks(){
    const landmarksInput: LandmarksInput = {
      landmark: [this.landmarkMain],
      region: this.landmarkRegion,
      min_citizens: this.landmarkMinCit,
      max_citizens: this.landmarkMaxCit
  };
    this.chatbotService.searchLandmarks(landmarksInput).subscribe(
      (response:LandmarksOutput[]) => {
        console.log(response);
        this.landmarksOutputList = response;
      }
    )
  }

  runRoutes(){
    const routesInput : RoutesInput = {
      routeDescription : [this.routeDescription],
      RouteDuration : this.routeDuration,
      DepartureTime : this.departureTime
    };
    this.chatbotService.searchRoutes(routesInput).subscribe(
      (response:RoutesOutput[]) => {
        console.log(response);
        this.routesOutputList = response;
      }
    )
  }

  runStops() {
    const stopsInput : StopsInput = {
      special_features : [this.specialFeatures],
      nearby_landmarks : this.nearbyLandmarks,
      facilities : this.facilities
    };
    this.chatbotService.searchStops(stopsInput).subscribe(
      (response:StopsOutput[]) => {
        console.log(response);
        this.stopsOutputList = response;
      }
    )

  }


}
