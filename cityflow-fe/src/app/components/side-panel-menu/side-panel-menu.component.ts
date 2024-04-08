import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHome, faIdCard, faInbox } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-panel-menu',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './side-panel-menu.component.html',
  styleUrl: './side-panel-menu.component.css'
})
export class SidePanelMenuComponent implements OnInit{
  //Icons
  faUser = faUser;
  faHome = faHome;
  faIdCard = faIdCard;
  faInbox = faInbox;

  //Menu item selections
  showHome : boolean = true;
  showProfile : boolean = false;
  showCards : boolean = false;
  showInbox : boolean = false;

  token : string | null = localStorage.getItem('token');
  loggedUser! : User;

  ngOnInit(): void {}

  public viewHome() : void{
    this.showHome = true;
    this.showProfile = false;
    this.showCards = false;
    this.showInbox = false;
  }
  
  public viewProfile() : void{
    this.showHome = false;
    this.showProfile = true;
    this.showCards = false;
    this.showInbox = false;
  }

  public viewCards() : void{
    this.showHome = false;
    this.showProfile = false;
    this.showCards = true;
    this.showInbox = false;
  }
  
  public viewInbox() : void{
    this.showHome = false;
    this.showProfile = false;
    this.showCards = false;
    this.showInbox = true;
  }
}
