import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LandmarksOutput } from '../../models/chat-bot-models/landmarksOutput';
import { LandmarksInput } from '../../models/chat-bot-models/landmarksInput';
import { ChatbotService } from '../../service/chatbot.service';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [NgIf,FormsModule,NgFor],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css'
})
export class ChatBotComponent implements OnInit{

  landmarksOutputList : LandmarksOutput[] = [];

  landmarkMainArr : string[] = [""];
  landmarkMain !: string;
  landmarkRegion !: string;
  landmarkMinCit !: number;
  landmarkMaxCit !: number;

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



}
