import { TestBed } from '@angular/core/testing';

import { ProgressStarService } from './progress-star.service';

describe('ProgressStarService', () => {
  let service: ProgressStarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressStarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
