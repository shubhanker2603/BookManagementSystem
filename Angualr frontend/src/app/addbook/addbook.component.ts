import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BookManagementService } from '../book-management.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  bookForm!: FormGroup;
  jwtToken : any;
  lenter: string = '';

  constructor(private fb: FormBuilder, private books: BookManagementService, private _snackBar: MatSnackBar) { 
    this.jwtToken = this.books.getToken();
    
    if(this.jwtToken){
    this.lenter = this.jwtToken.Email;    
    }
  }

  ngOnInit(): void {
    this.createForm();
    console.log('bookForm after createForm:', this.bookForm);
  }

  private createForm(): void {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      rating: [0, Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      bookAvailable: ['', Validators.required],
      description: ['', Validators.required],
      lenter: [this.lenter],
      borrower: ['']
    });
  }

  onSubmit(): void {
    console.log(this.bookForm.value);
    this.books.createBook(this.bookForm.value).subscribe((data)=>{
      this.books.getAllBooks();
      this._snackBar.open("Book Added Successfully", "Ok");
    });
  }
}
