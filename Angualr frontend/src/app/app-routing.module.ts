import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookslistComponent } from './bookslist/bookslist.component';
import { AddbookComponent } from './addbook/addbook.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { authGuard } from './auth.guard';
import { LentBooksComponent } from './lent-books/lent-books.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';

const routes: Routes = [
  {component: BookslistComponent, path:'booklist'},
  {component: AddbookComponent, path:'addbook',canActivate: [authGuard]},
  {component: HomepageComponent, path:''},
  {component: LoginpageComponent, path:'login'},
  {component:LentBooksComponent, path:'lent',canActivate: [authGuard]},
  {component:BorrowedBooksComponent, path:'borrowed',canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
