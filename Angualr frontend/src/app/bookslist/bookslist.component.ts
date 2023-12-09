import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { BookManagementService } from '../book-management.service';
import { MatDialog } from '@angular/material/dialog';
import { BorrowModalComponent } from '../borrow-modal/borrow-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-bookslist',
  templateUrl: './bookslist.component.html',
  styleUrls: ['./bookslist.component.css']
})
export class BookslistComponent {

  booksList: any;
  filteredBooksList:any;
  bookDetails:any;
  jwtToken:any;
  email:any;
  token:any;
  searchTerm: string = '';
  isLogedIn:boolean = false;

  constructor(private books: BookManagementService, private dialog: MatDialog, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar){
    this.jwtToken = this.books.getToken();
    
    if(this.jwtToken){
      this.email = this.jwtToken.Email;
      this.isLogedIn = this.jwtToken.LogedIn;
    }
    this.books.badge$.subscribe((value)=>{
      this.token = value;
    })
    this.fetchData();
  }



  fetchData(){
    this.books.getAllBooks().subscribe((data) => {
      this.booksList = data;
      this.filteredBooksList = data;
      // this.filteredItems = data;
    });
  }

  truncateDescription(description: string): string {
    const words = description.split(' ');
    if (words.length > 60) {
      return words.slice(0, 60).join(' ') + '...';
    }
    return description;
  }

  getStarIcons(rating: number): string[] {
    const starIcons = Array(rating).fill('star');
    return starIcons;
  }

  BorrowFnc(id:any){
    const dialogRef = this.dialog.open(BorrowModalComponent, {
      width: '85%', 
      data: { itemId: id }
    });
    dialogRef.afterClosed().subscribe(result => {
    }); 
  }

  onSearch() {
    console.log('Search Term:', this.searchTerm);
    console.log('Books List:', this.booksList);

    if (this.searchTerm.trim() === '') {
      this.filteredBooksList = this.booksList;
      return;
    }
    // Filter books based on the search term
    this.filteredBooksList = this.booksList.filter((book: { name: string; author: string; genre: string; }) => {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      console.log(this.filteredBooksList);
      return (
        book.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        book.author.toLowerCase().includes(lowerCaseSearchTerm) ||
        book.genre.toLowerCase().includes(lowerCaseSearchTerm)

        
      );
    });
  }

}
