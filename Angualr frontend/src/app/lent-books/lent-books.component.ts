import { Component } from '@angular/core';
import { BookManagementService } from '../book-management.service';

@Component({
  selector: 'app-lent-books',
  templateUrl: './lent-books.component.html',
  styleUrls: ['./lent-books.component.css']
})
export class LentBooksComponent {

   lentedList:any;
   displayedColumns: string[] = ['id', 'name', 'author', 'genre'];
   jwtToken:any;
   dataSource:any;

  constructor(private books:BookManagementService){
    this.jwtToken = this.books.getToken();

    this.books.getAllBooks().subscribe((data) => {
      this. lentedList = this.filterBorrowedList(data);
      this.dataSource = this.lentedList;
      // this.filteredItems = data;
    });
  }

  filterBorrowedList(data: any[]): any[] {
    // Extract email from jwtToken
    const email = this.jwtToken.Email;

    // Filter the list based on borrower_id and email
    const filteredList = data.filter(item => item.lenter === email);

    return filteredList;
  }
}
