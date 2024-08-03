import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router : Router) { }

  public navigateToSignIn() {
    this.router.navigate(['signin']);
  }

  public navigateToSignUp() {
    this.router.navigate(['signup']);
  }

  public navigateToDashboard() {
    this.router.navigate(['dashboard'])
  }
}
