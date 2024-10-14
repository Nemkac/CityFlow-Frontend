import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiServerUrl = 'http://localhost:8081'; 

  constructor(private http: HttpClient,
              private router: Router) { }
 
  // public buyTicket(busId : number, routeId : number, receiverMail : number) {
  //   this.http.post('http://localhost:8080/api/tickets/buy', { busId, routeId, email })
  // }
}
