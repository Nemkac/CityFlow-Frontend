import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidePannelComponent } from './components/side-panel/side-panel.component';
import { NgToastModule } from 'ng-angular-popup';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SidePanelProfileComponent } from "./components/side-panel-profile/side-panel-profile.component";
import { HttpErrorResponse } from '@angular/common/http';
import { User } from './models/user';
import { AuthService } from './service/auth.service';
import { SigninSignupComponent } from './components/signin-signup/signin-signup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidePannelComponent, NgToastModule, FullCalendarModule, NgbModule, SidePanelProfileComponent, SidePanelProfileComponent, SigninSignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'cityflow-fe';
  public isLoggedIn : boolean = false;
}
