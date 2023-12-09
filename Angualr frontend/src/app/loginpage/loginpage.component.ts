import { Component } from '@angular/core';
import { BookManagementService } from '../book-management.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  errorMessage : string = '';

  constructor(private login : AccountService, private router : Router, private groceryService: BookManagementService,private formBuilder: FormBuilder) {  
  }

  ngOnInit(): void {
  
  }

  loginTeacher(data : any): void {

    this.login.login(data).subscribe(
      (response) => {
        // Login successful, you can redirect to another page or perform actions here
        console.log('Login successful', response);
      
        // if(response.token){
        //   this.groceryService.userid = response.Email;
        //   this.groceryService.islogedIn = response.LogedIn;
        // }

        // Clear error message
        this.errorMessage = '';
        this.router.navigate(['']);
      },
      (error) => {
        // Login failed, handle error
        console.error('Login failed', error);
        this.errorMessage = 'Invalid login attempt. Please check your credentials.';
      }
    );
  }

}
