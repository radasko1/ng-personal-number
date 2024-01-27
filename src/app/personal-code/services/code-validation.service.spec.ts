import { TestBed } from '@angular/core/testing';

import { CodeValidationService } from './code-validation.service';

describe('CodeValidationService', () => {
  let service: CodeValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
