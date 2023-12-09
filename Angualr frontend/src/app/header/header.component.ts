import { Component, ChangeDetectorRef } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { BookManagementService } from '../book-management.service';
import { ToastrService } from 'ngx-toastr';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ProfileBottomSheetComponent } from '../profile-bottom-sheet/profile-bottom-sheet.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn:boolean = false;
  badgeContent = 0;
  email = '';
  jwtToken:any;

  constructor(private authService: AccountService,  private cdr: ChangeDetectorRef, private books: BookManagementService,  private toastr: ToastrService, private router: Router, private _bottomSheet: MatBottomSheet){
    // this.jwtToken = this.books.getToken();
    
    // if(this.jwtToken){
    // this.email = this.jwtToken.Email;
    // this.badgeContent = this.jwtToken.BookToken;
    // this.isSignedIn = this.jwtToken.LogedIn;
    // }
}

  ngOnInit(): void {
    // Subscribe to changes in login status
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      
      this.isLoggedIn = isLoggedIn;

      this.jwtToken = this.books.getToken();
    
    if(this.jwtToken){
      this.email = this.jwtToken.Name;
      this.isLoggedIn = this.jwtToken.LogedIn;
    }
      // Manually trigger change detection
      this.cdr.detectChanges();
    });

    this.books.badge$.subscribe((value)=>{
      this.badgeContent = value;
    })
    console.log(this.badgeContent);
  }

  logout(){
 
    this.authService.logout().subscribe(
      (response) => {
        // Logout successful, you can redirect to the login page or perform other actions
        console.log('Logout successful', response);
        this.isLoggedIn = false;
        console.log(this.isLoggedIn);
        this.router.navigate(['']);
      },
      (error) => {
        // Handle logout error, if any
        console.error('Logout failed', error);
      }
    );
    this.toastr.success('Logout confirmed.', '');

  }

  openBottomSheet(): void {
    this._bottomSheet.open(ProfileBottomSheetComponent);
  }


}
