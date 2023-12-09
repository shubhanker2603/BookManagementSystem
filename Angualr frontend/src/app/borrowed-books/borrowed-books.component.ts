import { Component } from '@angular/core';
import { BookManagementService } from '../book-management.service';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent {
   borrowedList:any;
   displayedColumns: string[] = ['id', 'name', 'author', 'genre'];
   jwtToken:any;
   dataSource:any;

  constructor(private books:BookManagementService){
    this.jwtToken = this.books.getToken();

    this.books.getAllBooks().subscribe((data) => {
      this. borrowedList = this.filterBorrowedList(data);
      this.dataSource = this.borrowedList;
      // this.filteredItems = data;
    });
  }

  filterBorrowedList(data: any[]): any[] {
    // Extract email from jwtToken
    const email = this.jwtToken.Email;

    // Filter the list based on borrower_id and email
    const filteredList = data.filter(item => item.borrower === email);

    return filteredList;
  }

}
