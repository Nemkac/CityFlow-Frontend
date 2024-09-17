import { Component, OnInit } from '@angular/core';
import { SigninSignupComponent } from '../signin-signup/signin-signup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidePanelMenuComponent } from '../side-panel-menu/side-panel-menu.component';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidePanelProfileComponent } from '../side-panel-profile/side-panel-profile.component';
import { TransPipePipe } from '../../trans-pipe.pipe';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [
    SigninSignupComponent, 
    FontAwesomeModule, 
    SidePanelMenuComponent, 
    FormsModule, 
    RouterOutlet, 
    HttpClientModule, 
    CommonModule,
    SidePanelProfileComponent,
    TransPipePipe
  ],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePannelComponent implements OnInit{

  isLoggedIn: boolean = false;
  faLanguage = faLanguage;
  
  constructor(private authService : AuthService){}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    
    window.addEventListener('storage', (event) => {
      if (event.key === 'token') {
        this.isLoggedIn = !!localStorage.getItem('token');
      }
    });
  }

  changeLanguage(){
    if(localStorage.getItem('lang') == 'srb') {
      localStorage.setItem('lang','eng');
    } else {
      localStorage.setItem('lang','srb');
    }
    window.location.reload();
  }
}
