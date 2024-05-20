import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HrAdminService } from '../../service/hr-admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDTO } from '../../dtos/userDTO';

@Component({
  selector: 'app-update-employe-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-employe-form.component.html',
  styleUrl: './update-employe-form.component.css'
})
export class UpdateEmployeFormComponent implements OnInit{
  userid!: number;
  userDTO: UserDTO = {
    username: '',
    name: '',
    lastname: '',
    password: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    roles: '',
    employed: false
  };
  constructor(private route: ActivatedRoute,
              private hrService: HrAdminService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userid = params['id'];
      console.log('Test ID:', this.userid);
    });
  }

  public updateUser(UpdateEmployeeForm: NgForm): void {
    this.hrService.updateUser(this.userid, UpdateEmployeeForm.value).subscribe(
      (updatedUser: User) => {
        console.log(updatedUser);
      },
      (error: HttpErrorResponse) => {
        console.log('An error occurred while terminating the employee:', error.message);
      }
    );
  }
}