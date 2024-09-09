import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRouteToBusModalComponent } from './add-route-to-bus-modal.component';

describe('AddRouteToBusModalComponent', () => {
  let component: AddRouteToBusModalComponent;
  let fixture: ComponentFixture<AddRouteToBusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRouteToBusModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRouteToBusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
