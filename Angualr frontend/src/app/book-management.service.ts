import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class BookManagementService {

  private baseUrl = 'http://localhost:11362/bookmngmt';

  userid : string = '';
  islogedIn: boolean = false;
  username: string = '';
  badge:number =0;
  public logStatusKey = 'status';
  private badgeContent = new BehaviorSubject<number>(0);

  badge$ = this.badgeContent.asObservable();


  constructor(private http: HttpClient, private user: AccountService) {
    const jwtToken = this.getToken();
    if(jwtToken){
    this.islogedIn = jwtToken.LogedIn;
    this.badge = jwtToken.BookToken;
  }
    localStorage.setItem(this.logStatusKey, JSON.stringify(this.islogedIn));

    this.user.badgeContent$.subscribe((value)=>{
      this.badge = value
      this.updateBadgeContent(this.badge);
    })
   }

   getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/books`);
  }

  getBookById(id: number): Observable<any> {

    const jwtToken = this.getToken();
    console.log(jwtToken);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken.token}`);

    return this.http.get<any>(`${this.baseUrl}/books/${id}`, {headers: headers});
  }

  createBook(newBook: any): Observable<any> {

    const jwtToken = this.getToken();
    console.log(jwtToken);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken.token}`);
    console.log(headers);
    return this.http.post<any>(`${this.baseUrl}/books/addbook`, newBook, {headers: headers});
  }

  borrowBook(id: number, lentId: string, rentId: string, rating:number): Observable<any> {
    this.badge--;
   this.updateBadgeContent(this.badge);

    return this.http.put(`${this.baseUrl}/books/borrow/${id}/${lentId}/${rentId}/${rating}`,{});
  }

  getToken(): any {
    const userJSON = localStorage.getItem(this.user.localStorageKey);
    console.log(userJSON);
    return userJSON ? JSON.parse(userJSON) : null;
  }

  updateBadgeContent(value: number) {
    this.badgeContent.next(value);
  }
}
