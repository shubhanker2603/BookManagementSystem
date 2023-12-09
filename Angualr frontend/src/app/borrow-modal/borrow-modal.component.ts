import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { BookManagementService } from '../book-management.service';
import { RejectComponent } from '../reject/reject.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrow-modal',
  templateUrl: './borrow-modal.component.html',
  styleUrls: ['./borrow-modal.component.css']
})
export class BorrowModalComponent {

  bookDetails:any;
  jwtToken:any;
  email:any;
  rating: number = 0;

  constructor(public dialogRef: MatDialogRef<BorrowModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private book:BookManagementService, private dialog: MatDialog,private snackBar: MatSnackBar,private router : Router){
    this.jwtToken = this.book.getToken();
    
    if(this.jwtToken){
      this.email = this.jwtToken.Email;  
    }

  }

  ngOnInit():void{
    this.book.getBookById(this.data.itemId).subscribe((data) => {
      this.bookDetails = data;
      console.log(this.bookDetails);
      
    });

  }

  getStarIcons(rating: number): string[] {
    const starIcons = Array(rating).fill('star');
    return starIcons;
  }
 
  onNoClick(){
   this.dialogRef.close(false);
 }

 getStar(): string[] {
  const starIcons = Array(5).fill('star');
  return starIcons;
}

setRating(rating: number): void {
  this.rating = rating;
}
 
 Confirm(){
  if(!this.jwtToken){
    this.router.navigate(['/login']);
  }
  else if(this.bookDetails.lenter === this.email ){
    const dialogRef = this.dialog.open(RejectComponent, {
      width: '50%', 
    });
    dialogRef.afterClosed().subscribe(result => {   
    }); 
  }
  else{
      this.book.borrowBook(this.data.itemId,this.bookDetails.lenter,this.email,this.rating).subscribe(() => {
    
        console.log('successfull!');
        this.snackBar.open('Book Borrowed Successfully!', 'Close', {
          duration: 4000, 
          panelClass: ['snackbar-style'] 
        });
        this.book.getAllBooks();
        this.dialogRef.close();
      }); 
       
  }
 }

}
