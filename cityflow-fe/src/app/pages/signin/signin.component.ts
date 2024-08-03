import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { LoginDTO } from '../../dtos/loginDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { NavigationService } from '../../service/navigation.service';
import { NgToastService } from 'ng-angular-popup';

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

  ngOnInit(): void {}

  constructor(private authService : AuthService, 
    private router : Router,
    private toast : NgToastService,
    public navigationService : NavigationService
  ){}

  public signIn(SignInForm: NgForm) : void{
    this.authService.logIn(SignInForm.value).subscribe(
      (response: LoginDTO) => {
        console.log("Successfully signed in!", response);
        this.toast.success({detail:"Welcome back!",summary:'Successfully signed in!', duration: 3000});
        this.authService.authStatusSubject.next(true);
        this.navigationService.navigateToDashboard();
      },
      (error: HttpErrorResponse) => {
        console.log("Error while signing in: ", error);
        this.toast.error({detail:"Error!",summary:'Incorrect username or password!', duration: 3000});

      }
    )
  }
}
