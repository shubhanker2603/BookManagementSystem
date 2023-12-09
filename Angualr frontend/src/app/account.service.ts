import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:11362/account';
  public localStorageKey = 'loggedInUser';
  public isAuthenticatedFlag: boolean = false;
  private badgeContentSource = new BehaviorSubject<number>(0);

  badgeContent$ = this.badgeContentSource.asObservable();

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Observable to subscribe to changes in login status
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(loginModel: any): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, loginModel).pipe(
      map((response: any) => {
        // Store user data in local storage upon successful login
        localStorage.setItem(this.localStorageKey, JSON.stringify(response));

        this.isLoggedInSubject.next(response.LogedIn);
        this.updateBadgeContent(response.BookToken);
        
        this.isAuthenticatedFlag = true;
        return response;
      }),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  logout(): Observable<any> {
    const url = `${this.baseUrl}/logout`;
    return this.http.post(url, null).pipe(
      map((response: any) => {
        localStorage.removeItem(this.localStorageKey);
        
        this.isAuthenticatedFlag = false;
        return response;
      }),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }

  updateBadgeContent(value: number) {
    this.badgeContentSource.next(value);
  }
}
