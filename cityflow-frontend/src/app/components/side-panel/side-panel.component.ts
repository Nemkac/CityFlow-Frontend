import { Component } from '@angular/core';
import { SigninSignupComponent } from '../signin-signup/signin-signup.component';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [SigninSignupComponent],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePannelComponent {

}
