import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCertif } from './checkout-certif';

describe('CheckoutCertif', () => {
  let component: CheckoutCertif;
  let fixture: ComponentFixture<CheckoutCertif>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutCertif]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutCertif);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
