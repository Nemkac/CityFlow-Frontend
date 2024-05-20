import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SalaryDTO } from '../../dtos/salaryDTO';
import { HrAdminService } from '../../service/hr-admin.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-assign-salary-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-salary-form.component.html',
  styleUrls: []
})
export class AssignSalaryFormComponent implements OnInit {
  @Input() userId!: number;
  successMessage: string = '';                                 
  errorMessage: string = '';
  assignSalary: any = {
    baseSalary: 0,
    overtimeHours: 0,
    holidayWorkHours: 0,
    nightShiftHours: 0,
    sickLeaveHours: 0,
    overtimePayRate: 0,
    holidayPayRate: 0,
    nightShiftPayRate: 0,
    sickLeaveType: 'nothing',
    totalSalary: 0
  };
  salaryDTO: SalaryDTO = {
    baseSalary: 0,
    overtimeHours: 0,
    holidayWorkHours: 0,
    nightShiftHours: 0,
    sickLeaveHours: 0,
    overtimePayRate: 0,
    holidayPayRate: 0,
    nightShiftPayRate: 0,
    sickLeaveType: 'nothing',
    totalSalary: 0
  };

  constructor(
    private salaryService: HrAdminService
  ) {}

  ngOnInit(): void {
    this.assignSalary.id = this.userId;
    console.log('User ID:', this.userId);
  }

  public onUpdateEmployee(AssignSalaryForm: NgForm): void {
    console.log('Update Employee: ', this.assignSalary);
    this.assignSalary.id = this.userId;

    this.salaryService.assignSalary(this.userId, AssignSalaryForm.value).subscribe(
      (response: SalaryDTO) => {
    console.log('Success:', response);
    this.successMessage = 'Salary assigned successfully!';
    this.errorMessage = '';
    this.clearForm();
  }, error => {
    console.error('Error:', error);
    this.successMessage = '';
    this.errorMessage = 'Failed to assign salary. Please check the data and try again.';
    this.clearIdAndFocus();
  });

  }
 
  clearForm() {
    this.assignSalary = {};
  }
  
  clearIdAndFocus() {
    this.assignSalary.id = null;
    const idInput = document.getElementById('idInput') as HTMLInputElement;
    if (idInput) {
      idInput.focus();
    }
  }
}
