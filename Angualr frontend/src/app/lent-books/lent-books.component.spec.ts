import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LentBooksComponent } from './lent-books.component';

describe('LentBooksComponent', () => {
  let component: LentBooksComponent;
  let fixture: ComponentFixture<LentBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LentBooksComponent]
    });
    fixture = TestBed.createComponent(LentBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
