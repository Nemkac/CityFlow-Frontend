import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faArrowDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { HrAdminService } from '../../service/hr-admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignSalaryFormComponent } from '../../components/assign-salary-form/assign-salary-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalaryDTO } from '../../dtos/salaryDTO';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  users$!: Observable<User[]>;

  user$!: Observable<Array<{ user: User; salary: SalaryDTO }>>;
  reason: string = '';
  selectedEmployee: User | null = null;
  nameFilter: string = '';
  roleFilter: string = '';

  faSearch = faSearch;
  faArrowDown = faArrowDown;
  faPlus = faPlus;

  userImages = new Map<number, any>();
  selectedImage: any;
  isModalOpen = false;

  @ViewChild('modal') modalElement!: ElementRef;

  constructor(
    private router: Router, 
    private userService: UserService,
    private hrAdminService: HrAdminService,
    private sanitizer: DomSanitizer, 
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    
    this.users$ = combineLatest([
      this.hrAdminService.searchUsersByName(this.nameFilter),
    ]).pipe(
      map(([nameResults]) => {
        return [...new Set([...nameResults])];
      })
    );
    this.loadUsersAndImages();

  }
  loadUsersAndImages(): void {
    this.users$ = this.hrAdminService.searchUsersByName('').pipe(
      map(users => {
        console.log("Original users:", users); // Log originalnih podataka
        return users.filter(user => user.employed);
      }),
      tap((users: any[]) => {
        console.log("Filtered users:", users); // Log filtriranih podataka
        users.forEach(user => {
          if (user.profilePicture) {
            this.hrAdminService.getUserProfilePicture(user.id).subscribe(
              base64Image => {
                this.userImages.set(user.id, this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${base64Image}`));
              },
              error => console.error('Error loading image for user:', user.id, error)
            );
          }
        });
      })
    );
  }
  
  

  onNameFilterChange(newFilter: string): void {
    this.nameFilter = newFilter;
    this.refreshData();
  }
  searchUsersByRole(): void {
    this.users$ = this.hrAdminService.searchUsersByRole(this.roleFilter);
  }
  searchUsersByName(): void {
    this.users$ =this.hrAdminService.searchUsersByName(this.nameFilter);
  }


  onRoleFilterChange(newFilter: string): void {
    this.roleFilter = newFilter;
    this.refreshData();
  }

  private refreshData(): void {
    this.users$ = combineLatest([
      this.hrAdminService.searchUsersByName(this.nameFilter),
    ]).pipe(
      map(([nameResults]) => {
        return [...new Set([...nameResults])]; 
      })
    );
  }

  editEmployee(userId: number): void {
    this.router.navigate(['/update-employee', userId]);
  }

  openAssignSalaryForm(userId: number) {
    this.router.navigate(['/assign-salary', userId]);
  }

 /* deleteUser(userId: number, reason: string): void {
    if (confirm('Are you sure you want to terminate this employee? This action cannot be undone.')) {
      this.hrAdminService.deleteUser(userId, reason).subscribe(
        () => {
          console.log('Employee terminated successfully.');
          this.users$ = this.userService.getUsersByRole();
        },
        error => {
          console.error('An error occurred while terminating the employee:', error);
        }
      );
    }
  }*/

  navigateToAddNewEmployee(): void {
    this.router.navigate(['/newEmployee']);
  }

  openImageModal(imageUrl: any): void {
    this.selectedImage = imageUrl;
    this.isModalOpen = true;
    setTimeout(() => {
      this.modalElement.nativeElement.classList.add('open');
    }, 10); // Koristi setTimeout da osiguraš da se CSS tranzicija pokrene nakon renderovanja
  }
  
  closeModal(): void {
    this.modalElement.nativeElement.classList.remove('open');
    setTimeout(() => {
      this.isModalOpen = false;
    }, 250); // Ovde je 300ms isto kao vreme trajanja tranzicije
  }
  navigateToDeleteEmployee(userId: number): void {
    this.router.navigate(['/deleteEmployee', userId]);
  }
}