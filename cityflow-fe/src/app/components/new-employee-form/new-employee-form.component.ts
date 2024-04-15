import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HrAdminService } from '../../service/hr-admin.service';
import { UserDTO } from '../../dtos/userDTO';

@Component({
  selector: 'app-new-employee-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-employee-form.component.html',
  styleUrl: './new-employee-form.component.css'
})
export class NewEmployeeFormComponent implements OnInit{
  roles: string = 'ROLE_ROUTEADMINISTRATOR';

  newUser!: UserDTO;

  constructor(private hrService : HrAdminService){}

  ngOnInit(): void {}

  public registerUser(RegisterForm : NgForm) : void {
    console.log(this.newUser);
    this.hrService.register(RegisterForm.value).subscribe(
      (response: UserDTO) => {
        console.log('User registered successfully:', response);
      },
      (error) => {
        console.error('Error registering user:', error);
      }
    );
  }
}
