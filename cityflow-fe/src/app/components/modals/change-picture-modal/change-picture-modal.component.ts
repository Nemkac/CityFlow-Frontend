import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-picture-modal',
  standalone: true,
  imports: [],
  templateUrl: './change-picture-modal.component.html',
  styleUrl: './change-picture-modal.component.css'
})
export class ChangePictureModalComponent {
  @Input() userId : string = '';
  @Input() userEmail : string = '';

  @Output() imageUploaded = new EventEmitter<void>();

  imageSrc: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private modalService : NgbActiveModal){}

  ngOnInit(): void {}

  public closeModal() {
    this.modalService.close();
  }

  public onPictureSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.selectedFile = element.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
  
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.imageSrc = null;
      this.selectedFile = null;
    }
  }
  
  public savePicture(): void {
    this.imageUploaded.emit();
    this.closeModal();
  }
}
