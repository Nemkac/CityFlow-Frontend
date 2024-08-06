import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterDTO } from '../../dtos/registerDTO';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { dt } from '@fullcalendar/core/internal-common';
import { NgToastService } from 'ng-angular-popup';
import { NavigationService } from '../../service/navigation.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  form!: FormGroup;

  newUser!: RegisterDTO;

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private toast : NgToastService,
    private navigationService : NavigationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordStrengthValidator]],
      repeatPassword : ['', [Validators.required]],
      username : ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });

    this.form.statusChanges.subscribe(status => {
      console.log('Form Status: ', status);
    });
  }

  public registerUser(RegisterForm : NgForm) : void {
    console.log(this.newUser);
    this.authService.register(RegisterForm.value).subscribe(
      (response: RegisterDTO) => {
        console.log('User registered successfully:', response);
      },
      (error) => {
        console.error('Error registering user:', error);
      }
    );
  }

  public signUp() : void{
    if(this.form.valid){
      const formValue = this.form.value;

      const dto : RegisterDTO = {
        email : formValue.email,
        name : formValue.name,
        lastname : formValue.lastname,
        username : formValue.username,
        phone : formValue.phone,
        dateOfBirth : formValue.dateOfBirth,
        password : formValue.password,
      }

      console.log(dto);
      this.authService.register(dto).subscribe(
        (response: any) => {
          console.log('User registered successfully:', response);
          this.toast.success({detail:"Success!",summary:'Profile successfully created! You can now sign in.', duration: 3000});
          this.navigationService.navigateToSignIn();
        },
        (error) => {
          console.error('Error registering user:', error);
          this.toast.error({detail:"Error!",summary:'Error while trying to register new account! Data may be incorrect.', duration:3000});
        }
      );
    }
  }

  public passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    let errors = {};

    if (!value.match(/[A-Z]/)) {
      errors = {...errors, uppercase: 'Password must include at least one uppercase letter'};
    }
    if (!value.match(/[0-9]/)) {
      errors = {...errors, digit: 'Password must include at least one number'};
    }
    if (!value.match(/[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\{\}\[\]\:\"\|\;\'\\\,\.\<\>\?]/)) {
      errors = {...errors, symbol: 'Password must include at least one symbol'};
    }
    if (value.length < 6) {
      errors = {...errors, length: 'Password must be at least 6 characters long'};
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }
  
  public passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const repeatPassword = group.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { passwordMismatch: true };
  }
}
