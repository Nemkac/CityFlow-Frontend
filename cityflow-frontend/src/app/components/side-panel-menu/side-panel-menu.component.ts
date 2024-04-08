import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHome, faIdCard, faInbox } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-side-panel-menu',
  standalone: true,
  imports: [FontAwesomeModule, ],
  templateUrl: './side-panel-menu.component.html',
  styleUrl: './side-panel-menu.component.css'
})
export class SidePanelMenuComponent implements OnInit{
  //Icons
  faUser = faUser;
  faHome = faHome;
  faIdCard = faIdCard;
  faInbox = faInbox;
  //token : string | null = localStorage.getItem('token');
  loggedUser! : User;

  ngOnInit(): void {}
}
