import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent implements OnInit{

  selectedFiles: { [key: string]: File } = {};
  token = localStorage.getItem('token');

  constructor(private http: HttpClient,
              private authService : AuthService,
              private userService : UserService) {}
              
  ngOnInit(): void {}
  onFileSelected(event: any, fileType: string) {
    this.selectedFiles[fileType] = event.target.files[0];
    console.log(this.selectedFiles['zahtev'])
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('zahtev', this.selectedFiles['zahtev']);
    formData.append('obrada', this.selectedFiles['obrada']);
    formData.append('fotografija', this.selectedFiles['fotografija']);
    formData.append('indeks', this.selectedFiles['indeks']);

    if(this.token != null){
      const headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${this.token}`
      });
      this.userService.uploadStudentFiles(formData,headers).subscribe(
        (response: String) => {
          console.log(response);
        },
        (error : HttpErrorResponse) => {
          console.log("Error while updating balance with kyc:\n", error.message);
        }
      )
    }
  }
}
