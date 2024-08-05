import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-waringn',
  standalone: true,
  imports: [],
  templateUrl: './waringn.component.html',
  styleUrl: './waringn.component.css'
})
export class WaringnComponent {
  @Output() confirmation = new EventEmitter<void>();

  constructor(private modalService : NgbActiveModal){}

  public performAction() {
    this.confirmation.emit();
    this.closeModal();
  }

  public closeModal() {
    this.modalService.close();
  }
}
