import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowModalComponent } from './borrow-modal.component';

describe('BorrowModalComponent', () => {
  let component: BorrowModalComponent;
  let fixture: ComponentFixture<BorrowModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowModalComponent]
    });
    fixture = TestBed.createComponent(BorrowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
