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
import { TransPipePipe } from '../../trans-pipe.pipe';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [NgIf,FormsModule,NgFor,TransPipePipe],
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
      region: "vojvodina",
      min_citizens: 1,
      max_citizens: 9999999
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
      RouteDuration : "10",
      DepartureTime : "23:59"
    };
    this.chatbotService.searchRoutes(routesInput).subscribe(
      (response:RoutesOutput[]) => {
        for(let i = 0; i < response.length; i++) {
          if(i == 0) {
            response[i].busLine = 11;
          } else {
            response[i].busLine = i*10-6;
          }
        }
        console.log(response);
        this.routesOutputList = response;
      }
    )
  }

  runStops() {
    const stopsInput : StopsInput = {
      special_features : [this.specialFeatures],
      nearby_landmarks : "",
      facilities : "wi-fi",
    };
    this.chatbotService.searchStops(stopsInput).subscribe(
      (response:StopsOutput[]) => {
        console.log(response);
        for(let i = 0; i < response.length; i++) {
          if(i == 0) {
            response[i].busLine = 17;
          } else {
            response[i].busLine = i*10-4;
          }
        }
        this.stopsOutputList = response; 
      }
    )

  }


}
