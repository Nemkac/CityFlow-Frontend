import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faArrowDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  //Icons
  faSearch = faSearch;
  faArrowDown = faArrowDown;
  faPlus = faPlus;
  users: User[] = [];

  constructor(private router: Router, private userService: UserService) {}

  showEmployees(): void {
    this.router.navigate(['/employees-list']);
  }

  navigateToAddNewEmployee(): void {
    this.router.navigate(['/newEmployee']);
  }
}