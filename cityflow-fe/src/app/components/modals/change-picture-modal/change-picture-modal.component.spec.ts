import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePictureModalComponent } from './change-picture-modal.component';

describe('ChangePictureModalComponent', () => {
  let component: ChangePictureModalComponent;
  let fixture: ComponentFixture<ChangePictureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePictureModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangePictureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
