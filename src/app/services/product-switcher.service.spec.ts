import { TestBed } from '@angular/core/testing';

import { ProductSwitcherService } from './product-switcher.service';

describe('ProductSwitcherService', () => {
  let service: ProductSwitcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSwitcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
