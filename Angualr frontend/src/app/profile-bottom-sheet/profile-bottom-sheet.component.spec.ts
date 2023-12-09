import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBottomSheetComponent } from './profile-bottom-sheet.component';

describe('ProfileBottomSheetComponent', () => {
  let component: ProfileBottomSheetComponent;
  let fixture: ComponentFixture<ProfileBottomSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileBottomSheetComponent]
    });
    fixture = TestBed.createComponent(ProfileBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
