using BookMngmtBLL.BLLModels;
using System.Collections.Generic;

namespace BookMngmtBLL.BooksRepo
{
    public interface IBooksBLLOPs
    {
        void AddBook(BookModel eventModel);
        List<BookModel> GetAllBooks();
        BookModel GetBookById(int? id);
        public void EditBook(int id, string Borrower, int rating);
    }
}