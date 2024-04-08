import { Component, OnInit } from '@angular/core';
import { SigninSignupComponent } from '../signin-signup/signin-signup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidePanelMenuComponent } from '../side-panel-menu/side-panel-menu.component';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [SigninSignupComponent, FontAwesomeModule, SidePanelMenuComponent, FormsModule, RouterOutlet,HttpClientModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePannelComponent implements OnInit{

  loggedUser!: User;
  token = localStorage.getItem('token');


  constructor(private authService : AuthService){}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

 
}
