import { TestBed } from '@angular/core/testing';

import { StartPhaseService } from './start-phase.service';

describe('StartPhaseService', () => {
  let service: StartPhaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartPhaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
