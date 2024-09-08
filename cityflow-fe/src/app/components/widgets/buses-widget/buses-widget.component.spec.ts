import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusesWidgetComponent } from './buses-widget.component';

describe('BusesWidgetComponent', () => {
  let component: BusesWidgetComponent;
  let fixture: ComponentFixture<BusesWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusesWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
