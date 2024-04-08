import { Component } from '@angular/core';
import { SigninSignupComponent } from '../signin-signup/signin-signup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHome, faIdCard, faInbox } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [SigninSignupComponent,FontAwesomeModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePannelComponent {
  //Icons
  faUser = faUser;
  faHome = faHome;
  faIdCard = faIdCard;
  faInbox = faInbox;
}
