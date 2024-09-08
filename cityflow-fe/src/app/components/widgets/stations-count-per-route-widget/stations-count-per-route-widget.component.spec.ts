import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsCountPerRouteWidgetComponent } from './stations-count-per-route-widget.component';

describe('StationsCountPerRouteWidgetComponent', () => {
  let component: StationsCountPerRouteWidgetComponent;
  let fixture: ComponentFixture<StationsCountPerRouteWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationsCountPerRouteWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationsCountPerRouteWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
