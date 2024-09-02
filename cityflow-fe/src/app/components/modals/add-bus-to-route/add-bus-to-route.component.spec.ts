import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusToRouteComponent } from './add-bus-to-route.component';

describe('AddBusToRouteComponent', () => {
  let component: AddBusToRouteComponent;
  let fixture: ComponentFixture<AddBusToRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBusToRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBusToRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
