import { TestBed } from '@angular/core/testing';

import { RouteAdministratorService } from './route-administrator.service';

describe('RouteAdministratorService', () => {
  let service: RouteAdministratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteAdministratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
