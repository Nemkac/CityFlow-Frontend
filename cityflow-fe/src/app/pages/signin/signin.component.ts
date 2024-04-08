import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { LoginDTO } from '../../dtos/loginDTO';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{
  //Icons
  //faArrowRight = faArrowRight;

  ngOnInit(): void {}

  constructor(private authService : AuthService){}

  public signIn(SignInForm: NgForm) : void{
    this.authService.logIn(SignInForm.value).subscribe(
      (response: LoginDTO) => {
        console.log("Successfully signed in!", response);
      },
      (error: HttpErrorResponse) => {
        console.log("Error while signing in: ", error);
      }
    )
  }
}
