import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMalfunctionComponent } from './report-malfunction.component';

describe('ReportMalfunctionComponent', () => {
  let component: ReportMalfunctionComponent;
  let fixture: ComponentFixture<ReportMalfunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportMalfunctionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportMalfunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
