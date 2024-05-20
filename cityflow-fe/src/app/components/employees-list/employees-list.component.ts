import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';
import { HrAdminService } from '../../service/hr-admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDTO } from '../../dtos/userDTO';
import { Router } from '@angular/router';
import { SalaryDTO } from '../../dtos/salaryDTO';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModal instead of NgbActiveModal
import { AssignSalaryFormComponent } from '../assign-salary-form/assign-salary-form.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EmployeesListComponent implements OnInit {
  users$!: Observable<User[]>;
  reason: string = '';
  selectedEmployee: User | null = null;
  userId: any;

  constructor(
    private modalService: NgbModal, // Use NgbModal here instead of NgbActiveModal
    private userService: UserService,
    private hrAdminService: HrAdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsersByRole();
  }

  deleteUser(userId: number, reason: string): void {
    if (confirm('Are you sure you want to terminate this employee? This action cannot be undone.')) {
      this.hrAdminService.deleteUser(userId, this.reason).subscribe(
        () => {
          console.log('Employee terminated successfully.');
          this.users$ = this.userService.getUsersByRole();
        },
        error => {
          console.log('An error occurred while terminating the employee:', error);
        }
      );
    }
  }

  editEmployee(userId: number): void {
    this.router.navigate(['/update-employee', userId]);
  }

  openAssignSalaryForm(userId: number) {
    const modalRef = this.modalService.open(
      AssignSalaryFormComponent,
      { backdrop: 'static', keyboard: true }
    );
  
    // Pass the userId to the component instance
    modalRef.componentInstance.userId = userId;
  }
  
}
