import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../service/auth.service';
import { HrAdminService } from '../../service/hr-admin.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserMessageDTO } from '../../dtos/userMessageDTO';
import { UserMessages } from '../../models/userMessages';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Dodajte ovo ako koristite ikonice kao module
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent implements OnInit {
  token = localStorage.getItem('token');
  loggedUser!: User;
  userImage: any;
  user: User = {} as User;
  receivedMessages: any[] = [];
  sentMessages: any[] = [];
  receiverId!: number;  // Added for future use if needed
  chatUsers: User[] = [];  // Adjusted for consistent typing with Users
  selectedUser!: User; // Adjusted for consistent typing with Users
  messages: UserMessages[] = [];  // Messages in the current chat
  newMessageContent: string = '';
  nameFilter: string = ''; // Variable for filtering
  faSearch = faSearch; // FontAwesome icon
  communicationPartners: any[] = [];
  faPaperPlane = faPaperPlane;


  constructor(
    private authService: AuthService,
    private hrAdminService: HrAdminService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchUser();
    //this.fetchChatUsers(); 
    this.fetchCommunicationPartners();


    //this.loadMessages();
  }

  fetchCommunicationPartners(): void {
    if (this.loggedUser && this.loggedUser.id) {
      this.hrAdminService.getCommunicationPartners(this.loggedUser.id).subscribe(partners => {
        this.communicationPartners = partners;
      }, error => {
        console.error('Failed to fetch communication partners:', error);
      });
    }
  }

  public fetchUser(): void {
    if (this.token != null) {
      this.authService.getUserFromToken(this.token).subscribe(
        (response: User) => {
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
          this.fetchCommunicationPartners(); // Fetch partners only after the user is fully loaded
        },
        (error: HttpErrorResponse) => {
          console.log('Error fetching user data:\n', error.message);
        }
      )
    }
  }
  
 /* fetchChatUsers(): void {
    this.chatUsers = this.hrAdminService.getUsers(); 
  }
  */
  searchUsersByName(): void {
    if (this.nameFilter.trim()) {
      this.hrAdminService.searchUsersByName(this.nameFilter).subscribe(users => {
        this.chatUsers = users;  // This will hold the search results
      }, error => {
        console.error('Search failed:', error);
      });
    } else {
      this.chatUsers = [];  // Clear results if search is cleared
    }
  }
  
  

  selectUser(user: User): void {
    this.selectedUser = user;
    this.messages = [];
    this.loadMessages();
    this.nameFilter = '';
    this.fetchCommunicationPartners();
    this.cdr.detectChanges();  // Force update the view
  }
  

  loadMessages(): void {
    if (this.loggedUser && this.selectedUser) {
      this.hrAdminService.getMessagesBetweenUsers(this.loggedUser.id, this.selectedUser.id).subscribe(messages => {
        this.messages = messages;
      }, error => {
        console.error('Failed to load messages:', error);
      });
    }
  }
  

  sendMessage(): void {
    if (this.newMessageContent && this.selectedUser) {
      this.hrAdminService.sendMessage(this.loggedUser.id, this.selectedUser.id, this.newMessageContent).subscribe(message => {
        this.messages.push(message);
        this.newMessageContent = '';  
      });
    }
  }
}