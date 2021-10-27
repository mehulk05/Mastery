import { TestBed } from '@angular/core/testing';

import { ArticleCrudService } from './article-crud.service';

describe('ArticleCrudService', () => {
  let service: ArticleCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
