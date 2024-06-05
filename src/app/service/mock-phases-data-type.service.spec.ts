import { TestBed } from '@angular/core/testing';

import { MockPhasesDataTypeService } from './mock-phases-data-type.service';

describe('MockPhasesDataTypeService', () => {
  let service: MockPhasesDataTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockPhasesDataTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
