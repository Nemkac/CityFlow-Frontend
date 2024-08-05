import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaringnComponent } from './waringn.component';

describe('WaringnComponent', () => {
  let component: WaringnComponent;
  let fixture: ComponentFixture<WaringnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaringnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaringnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
