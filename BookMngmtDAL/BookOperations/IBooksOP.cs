using BookMngmtDAL.Entities;
using System.Collections.Generic;

namespace BookMngmtDAL.BookOperations
{
    public interface IBooksOP
    {
        List<BookEntity> GetAllBooks();
        BookEntity GetBookById(int? id);
        void PostItem(BookEntity events);
        public void UpdateBook(BookEntity events);
        public bool BookModelExists(int id);
    }
}