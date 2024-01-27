import { TestBed } from '@angular/core/testing';

import { CodeParserService } from './code-parser.service';

describe('CodeParserService', () => {
  let service: CodeParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
