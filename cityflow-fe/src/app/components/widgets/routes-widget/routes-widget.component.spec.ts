import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesWidgetComponent } from './routes-widget.component';

describe('RoutesWidgetComponent', () => {
  let component: RoutesWidgetComponent;
  let fixture: ComponentFixture<RoutesWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoutesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
