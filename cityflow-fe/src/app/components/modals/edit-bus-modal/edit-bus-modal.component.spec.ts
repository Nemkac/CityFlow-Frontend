import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusModalComponent } from './edit-bus-modal.component';

describe('EditBusModalComponent', () => {
  let component: EditBusModalComponent;
  let fixture: ComponentFixture<EditBusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBusModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
