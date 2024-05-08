import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusServiceRankingsComponent } from './bus-service-rankings.component';

describe('BusServiceRankingsComponent', () => {
  let component: BusServiceRankingsComponent;
  let fixture: ComponentFixture<BusServiceRankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusServiceRankingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusServiceRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
