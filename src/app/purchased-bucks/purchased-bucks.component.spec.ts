import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedBucksComponent } from './purchased-bucks.component';

describe('PurchasedBucksComponent', () => {
  let component: PurchasedBucksComponent;
  let fixture: ComponentFixture<PurchasedBucksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedBucksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedBucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
