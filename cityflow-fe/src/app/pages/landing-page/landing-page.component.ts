import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{
  constructor(private router: Router){}

  ngOnInit(): void {}

  public navigateToSignIn() : void {
    this.router.navigate(['/signin']);
  }

  public navigateToSignUp() : void {
    this.router.navigate(['/signup']);
  }
}
