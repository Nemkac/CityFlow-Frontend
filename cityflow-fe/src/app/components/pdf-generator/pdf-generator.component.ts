import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';

@Component({
	selector: 'app-pdf-generator',
	templateUrl: './pdf-generator.component.html',
	styleUrls: ['./pdf-generator.component.css'],
})
export class PdfGeneratorComponent {
  podaci : string[];
  sablon : string[];
  constructor(private http: HttpClient,
    private authService : AuthService,
    private userService : UserService) {
      this.podaci = [];
      this.sablon = [];
    }
    
    token = localStorage.getItem('token');

	generatePDF() {
    this.getData()
		// Create a new PDF document.
		const doc = new jsPDF();
    
		// Add content to the PDF.
		doc.setFontSize(16);
		doc.text('CityFlow monthly report for KYC administrators', 10, 10);
		doc.setFontSize(12);
		doc.text(
			'This report contains all informations regarding requests and transactions for the past 30 days.\n\nIn the report data is displayed separately and united.\n\n',
			10,
			20,
		);

		// Create a table using `jspdf-autotable`.
		const headers = [['Pensioner requests', 'Student requests', 'Healthcare requests', 'Vacation requests','All requests','User Transactions']];
		const data = [
      this.podaci
			
		];

		autoTable(doc, {
			head: headers,
			body: data,
			startY: 50, // Adjust the `startY` position as needed.
		});

		// Save the PDF.
		doc.save('table.pdf');
	}

public getData(): void{  
  if(this.token != null){
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    });
    this.userService.getData(headers).subscribe(
      (response: string[]) => {
        console.log(response);
        this.podaci = response
        this.sablon = ['David', 'david@example.com', 'Sweden'];
      },
      (error : HttpErrorResponse) => {
        console.log("Error while updating balance with kyc:\n", error.message);
      }
    )
  }
}
}