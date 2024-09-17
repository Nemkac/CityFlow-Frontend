import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterDTO } from '../../dtos/registerDTO';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgToastModule, ToasterPosition } from 'ng-angular-popup'
import { TransPipePipe } from '../../trans-pipe.pipe';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FontAwesomeModule,FormsModule,NgToastModule,TransPipePipe],
  providers: [NgToastService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  //Icons
  //faArrowRight = faArrowRight;
  ToasterPosition = ToasterPosition;
  private = inject(NgToastService); //inject the service


  newUser!: RegisterDTO;

  constructor(private authService: AuthService,
              private router : Router,
              private toast: NgToastService
  ) {}

  ngOnInit(): void {
  }

  public registerUser(RegisterForm : NgForm) : void {
    this.authService.register(RegisterForm.value).subscribe(
      (response: RegisterDTO) => {
        console.log('User registered successfully:', response);
        this.toast.success("Succesffuly registered ! You can now log in. ","SUCCESS",1500);
        setTimeout(() => {
          this.router.navigate(['/signin']); 
        }, 1500);  
      },
      (error) => {
        console.error('Error registering user:', error);
      }
    );
  }
}
