import { TestBed } from '@angular/core/testing';

import { ShareAbleService } from './share-able.service';

describe('ShareAbleService', () => {
  let service: ShareAbleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareAbleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
