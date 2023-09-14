import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingProductComponent } from './outgoing-product.component';

describe('OutgoingProductComponent', () => {
  let component: OutgoingProductComponent;
  let fixture: ComponentFixture<OutgoingProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutgoingProductComponent]
    });
    fixture = TestBed.createComponent(OutgoingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
