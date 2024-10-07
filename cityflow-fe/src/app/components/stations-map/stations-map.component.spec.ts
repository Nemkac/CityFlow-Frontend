import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsMapComponent } from './stations-map.component';

describe('StationsMapComponent', () => {
  let component: StationsMapComponent;
  let fixture: ComponentFixture<StationsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationsMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StationsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});