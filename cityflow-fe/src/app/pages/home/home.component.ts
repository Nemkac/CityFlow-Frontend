import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { HrAdminService } from '../../service/hr-admin.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  token = localStorage.getItem('token');
  loggedUser! : User;
  userImage: any;
  user: User = {} as User;
  employmentChart: any;

  constructor(private authService : AuthService,
    private userService : UserService,
    private hrAdminService : HrAdminService,
    private sanitizer: DomSanitizer,
    private router: Router) {}
    
  ngOnInit(): void {
    this.fetchUser();
    this.loadEmploymentStatistics();

  }

  loadEmploymentStatistics(): void {
    this.hrAdminService.getEmploymentStatistics().subscribe({
        next: (stats) => {
            this.createChart(stats.employedCount, stats.terminatedCount);
        },
        error: (error) => {
            console.log('Error fetching statistics:', error);
        }
    });
}

createChart(employedCount: number, terminatedCount: number): void {
    const data = {
        labels: ['Employed', 'Terminated'],
        datasets: [{
            label: 'Employment Statistics',
            data: [employedCount, terminatedCount],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

//    this.employmentChart = new Chart('employmentChartCanvas', config);
}

  public fetchUser() : void {
    if(this.token != null){
      this.authService.getUserFromToken(this.token).subscribe(
        (response : User) => {
          this.loggedUser = response;
          if (this.loggedUser.profilePicture) {
            this.hrAdminService.getUserProfilePicture(this.loggedUser.id).subscribe(
              base64Image => {
                this.userImage = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${base64Image}`);
              },
              error => {
                console.log('No image found:', error);
                this.userImage = null; 
              }
            );
          }
        },
        (error: HttpErrorResponse) => {
          console.log('Error fetching user data:\n', error.message);
        }
      )
    }
  }
}
