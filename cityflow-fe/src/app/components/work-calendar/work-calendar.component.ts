import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { WorkCalendarService } from '../../service/calendar.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddShiftFormComponent } from '../add-shift-form/add-shift-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-work-calendar',
  templateUrl: './work-calendar.component.html',
  imports: [FullCalendarModule, CommonModule, FormsModule],
  styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    events: [],
  };
  currentMonth: string = '';
  currentYear: number = 0;

  constructor(private workCalendarService: WorkCalendarService, 
              private router: Router,
              private modalService: NgbModal ) { }

  ngOnInit(): void {
    const today = new Date();
    this.currentMonth = today.toLocaleString('default', { month: 'long' });
    this.currentYear = today.getFullYear();

    this.workCalendarService.getAllShifts().subscribe((shifts: any) => {
      this.calendarOptions.events = shifts.map((shift: any) => ({
        title: `User: ${shift.userId} - Route: ${shift.routeId || 'N/A'}`,
        start: shift.startTime,
        end: shift.endTime,
        description: `Location: ${shift.location}`
      }));
    }, (error) => {
      console.error('Failed to fetch shifts:', error);
    });
  }

  
  addShift(): void {
    this.router.navigate(['/add-shift']);
  }

  openAddShiftForm() {
    const modalRef = this.modalService.open(
      AddShiftFormComponent,
      { backdrop: 'static', keyboard: true }
    );
   // modalRef.componentInstance.userId = userId;
  }

}
