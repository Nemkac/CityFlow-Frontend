import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTypesPerRouteWidgetComponent } from './bus-types-per-route-widget.component';

describe('BusTypesPerRouteWidgetComponent', () => {
  let component: BusTypesPerRouteWidgetComponent;
  let fixture: ComponentFixture<BusTypesPerRouteWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusTypesPerRouteWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusTypesPerRouteWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
