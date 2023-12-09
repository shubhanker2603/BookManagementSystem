import { Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatCardModule} from '@angular/material/card';
import { BookManagementService } from '../book-management.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-profile-bottom-sheet',
  templateUrl: './profile-bottom-sheet.component.html',
  styleUrls: ['./profile-bottom-sheet.component.css']
})
export class ProfileBottomSheetComponent {
  jwtToken:any;
  badgeContent: number = 0;

  constructor(private _bottomSheetRef: MatBottomSheetRef<ProfileBottomSheetComponent>,private books: BookManagementService){
    this.jwtToken = this.books.getToken();
    this.books.badge$.subscribe((value)=>{
      this.badgeContent = value;
    })
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
