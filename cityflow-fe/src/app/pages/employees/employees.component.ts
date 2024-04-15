import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faArrowDown, faPlus } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private router : Router){}

  public navigateToAddNewEmployee() : void {
    this.router.navigate(['/newEmployee']);
  }

}
