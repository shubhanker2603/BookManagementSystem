import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { MatSidenavContent } from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import { BookslistComponent } from './bookslist/bookslist.component';
import {MatCardModule} from '@angular/material/card';
import { AddbookComponent } from './addbook/addbook.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BorrowModalComponent } from './borrow-modal/borrow-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RejectComponent } from './reject/reject.component';
import { ProfileBottomSheetComponent } from './profile-bottom-sheet/profile-bottom-sheet.component';
import {
  MatBottomSheetModule
} from '@angular/material/bottom-sheet';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { LentBooksComponent } from './lent-books/lent-books.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookslistComponent,
    AddbookComponent,
    HomepageComponent,
    LoginpageComponent,
    BorrowModalComponent,
    RejectComponent,
    ProfileBottomSheetComponent,
    BorrowedBooksComponent,
    LentBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatBadgeModule,
    MatSidenavModule,
    MatTooltipModule,
    MatTabsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule, 
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center', // Set the position to top center
      timeOut: 3000, // Set the duration for which each toast is shown
    }),
    MatSnackBarModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
