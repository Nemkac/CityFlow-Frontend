import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalfunctionDataComponent } from './malfunction-data.component';

describe('MalfunctionDataComponent', () => {
  let component: MalfunctionDataComponent;
  let fixture: ComponentFixture<MalfunctionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MalfunctionDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MalfunctionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
