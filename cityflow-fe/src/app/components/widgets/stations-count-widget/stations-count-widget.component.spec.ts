import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsCountWidgetComponent } from './stations-count-widget.component';

describe('StationsCountWidgetComponent', () => {
  let component: StationsCountWidgetComponent;
  let fixture: ComponentFixture<StationsCountWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationsCountWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationsCountWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
