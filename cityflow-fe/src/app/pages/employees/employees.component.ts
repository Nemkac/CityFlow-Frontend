import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faArrowDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import { CommonModule } from '@angular/common';
import { FinancialReport } from '../../models/financial-report'; // Import the interface
import { HrAdminService } from '../../service/hr-admin.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  // Icons
  faSearch = faSearch;
  faArrowDown = faArrowDown;
  faPlus = faPlus;
  users: User[] = [];
  financialReport: FinancialReport | null = null;

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private hrAdminService: HrAdminService) {}

  showEmployees(): void {
    this.router.navigate(['/employees-list']);
  }

  navigateToAddNewEmployee(): void {
    this.router.navigate(['/newEmployee']);
  }

  showFinancialReport(): void {
    this.hrAdminService.getAggregatedFinancialReport().subscribe({
      next: (data: FinancialReport) => {
        this.financialReport = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching financial report', error);
      }
    });
  }

  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  downloadPDF(): void {
    if (!this.financialReport) return;
    const doc = new jsPDF();
    doc.text('Financial Report', 10, 10);
    doc.text(`Date: ${new Date().toISOString().split('T')[0]}`, 10, 20);
    const report = this.financialReport;
    
    doc.text(`Daily Ticket Sales: ${report.dailyTicketSales}`, 10, 30);
    doc.text(`Monthly Ticket Sales: ${report.monthlyTicketSales}`, 10, 40);
    doc.text(`Annual Ticket Sales: ${report.annualTicketSales}`, 10, 50);
    doc.text(`Sponsorship Revenue: ${report.sponsorshipRevenue}`, 10, 60);
    doc.text(`Total Salaries Paid: ${report.totalSalariesPaid}`, 10, 70);
    doc.text(`Fuel Costs: ${report.fuelCosts}`, 10, 80);
    doc.text(`Vehicle Maintenance Costs: ${report.vehicleMaintenanceCosts}`, 10, 90);
    doc.text(`Net Profit: ${report.netProfit}`, 10, 100);
    
    doc.save('financial_report.pdf');
  }
}
