import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { LoginDTO } from '../../dtos/loginDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { GlobalService } from '../../global.service';
import { NgToastModule, ToasterPosition } from 'ng-angular-popup'
import { TransPipePipe } from '../../trans-pipe.pipe';



@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule,NgToastModule,TransPipePipe],
  providers: [NgToastService],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{
  //Icons
  faArrowRight = faArrowRight;
  token !: string | null;
  loggedUserRole !: string;

  ToasterPosition = ToasterPosition;
  private = inject(NgToastService); //inject the service


  ngOnInit(): void {}

  constructor(private authService : AuthService, 
              private router : Router,
              private cdRef: ChangeDetectorRef,
              private toast: NgToastService,
              private globalService:GlobalService){}

  public signIn(SignInForm: NgForm): void {
    this.authService.logIn(SignInForm.value).subscribe(
      (response: LoginDTO) => {
        console.log("Successfully signed in!");
        this.token = localStorage.getItem('token');
        this.toast.success('Successfully loged in!','Success');
        if(this.token != null) {
        this.authService.getUserFromToken(this.token).subscribe(
          (response1:User) => {
            this.loggedUserRole = response1.roles;
            if (this.loggedUserRole === 'ROLE_DRIVER') {
              this.router.navigate(['/reportMalfunction']);
              sessionStorage.setItem('keyDriver','0');
            } else if (this.loggedUserRole === 'ROLE_CHARGER') {
              this.router.navigate(['']);
              sessionStorage.setItem('keyCharger','0');
            } else if (this.loggedUserRole === 'ROLE_SERVICE') {
              this.router.navigate(['']);
              sessionStorage.setItem('keyServicer','0');
            } else if (this.loggedUserRole === 'ROLE_NONE') {
              this.router.navigate(['']);
              sessionStorage.setItem('keyNoRole','0');
            } else if (this.loggedUserRole === 'SUPER_ADMIN') {
              this.router.navigate(['']);
              sessionStorage.setItem('keySuperAdmin','0');
            }
          }  
        )
        } 
      },
      (error: HttpErrorResponse) => {
        console.log("Error while signing in: ", error);
        this.toast.warning("Loging credentials incorrect", "Oops", 5000);
      }
    );
  }
  
}
