import { Component, OnInit } from '@angular/core';
//import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css'
})
export class SigninSignupComponent implements OnInit {
  //Icons
  //faArrowRight = faArrowRight;

  ngOnInit(): void {}

  constructor(private router: Router){}

  public navigateToSignIn() : void {
    this.router.navigate(['/signin']);
  }

  public navigateToSignUp() : void {
    this.router.navigate(['/signup']);
  }
}
