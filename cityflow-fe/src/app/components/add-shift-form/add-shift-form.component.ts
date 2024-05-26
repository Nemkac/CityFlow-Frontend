import { Component, OnInit } from '@angular/core';
import { WorkCalendarService } from '../../service/calendar.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Shift } from '../../models/shift';

@Component({
  selector: 'app-add-shift-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-shift-form.component.html',
  styleUrl: './add-shift-form.component.css'
})
export class AddShiftFormComponent implements OnInit {
 newShift: Shift =
 {
   id: 0,
   userId: 0,
   routeId: 0,
   startTime: new Date(),
    endTime: new Date(),
   location: ''
 }
 formOpen: boolean = true;

  constructor(
    private workCalendarService: WorkCalendarService,
  ) { }

  ngOnInit(): void {

  }

  public addShift(newShiftForm: NgForm): void {
  
    this.workCalendarService.addShift(newShiftForm.value).subscribe(() => {
      console.log('Shift added successfully');
      this.clearForm(newShiftForm);
      this.toggleForm(); 
    }, (error) => {
      console.error('Failed to add shift:', error);
      this.clearIdAndFocus(newShiftForm);
    });
  }
  toggleForm(): void {
    this.formOpen = !this.formOpen;
  }
  
  clearForm(newShiftForm: NgForm) {
    newShiftForm.resetForm();
  }
  
  clearIdAndFocus(newShiftForm: NgForm) {
    newShiftForm.resetForm({ userId: null }); 
  }
}
