import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasProductComponent } from './purchas-product.component';

describe('PurchasProductComponent', () => {
  let component: PurchasProductComponent;
  let fixture: ComponentFixture<PurchasProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasProductComponent]
    });
    fixture = TestBed.createComponent(PurchasProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
