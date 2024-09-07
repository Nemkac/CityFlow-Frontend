import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { LoginDTO } from '../../dtos/loginDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{
  //Icons
  faArrowRight = faArrowRight;
  token !: string | null;
  loggedUserRole !: string;

  ngOnInit(): void {}

  constructor(private authService : AuthService, 
              private router : Router){}

  public signIn(SignInForm: NgForm): void {
    this.authService.logIn(SignInForm.value).subscribe(
      (response: LoginDTO) => {
        console.log("Successfully signed in!");
  
        this.token = localStorage.getItem('token');
        if(this.token != null) {
        this.authService.getUserFromToken(this.token).subscribe(
          (response1:User) => {
            this.loggedUserRole = response1.roles;
            if (this.loggedUserRole === 'ROLE_DRIVER') {
              this.router.navigate(['/reportMalfunction']);
            } else if (this.loggedUserRole === 'ROLE_CHARGER') {
              this.router.navigate(['/chargingPlanGeneticAlgorithm']);
            } else if (this.loggedUserRole === 'ROLE_SERVICE') {
              this.router.navigate(['/busesServiceRankings']);
            }
          }
        )
        } 
      },
      (error: HttpErrorResponse) => {
        console.log("Error while signing in: ", error);
      }
    );
  }
  
}
