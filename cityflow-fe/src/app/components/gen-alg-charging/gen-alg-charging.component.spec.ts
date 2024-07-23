import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenAlgChargingComponent } from './gen-alg-charging.component';

describe('GenAlgChargingComponent', () => {
  let component: GenAlgChargingComponent;
  let fixture: ComponentFixture<GenAlgChargingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenAlgChargingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenAlgChargingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
