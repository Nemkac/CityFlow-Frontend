import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusServicingsComponent } from './bus-servicings.component';

describe('BusServicingsComponent', () => {
  let component: BusServicingsComponent;
  let fixture: ComponentFixture<BusServicingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusServicingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusServicingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
