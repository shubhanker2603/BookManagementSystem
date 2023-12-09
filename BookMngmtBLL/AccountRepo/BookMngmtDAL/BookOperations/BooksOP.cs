using BookMngmtDAL.Backend_Data;
using BookMngmtDAL.Entities;
using BookMngmtDAL.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BookMngmtDAL.BookOperations
{
    public class BooksOP : IBooksOP
    {
        private readonly DataContext _context;
        private readonly IUnitOfWork _unitOfWork;

        public BooksOP(DataContext context, IUnitOfWork unitOfWork)
        {
            _context = context;
            _unitOfWork = unitOfWork;
        }

        public List<BookEntity> GetAllBooks()
        {

            return _context.Books.ToList();
        }

        public BookEntity GetBookById(int? id)
        {

            BookEntity p = new BookEntity();

            p = _context.Books.FirstOrDefault(x => x.Id == id);

            return p;
        }


        public void PostItem(BookEntity events)
        {

            _context.Books.Add(events);
            _unitOfWork.Commit();
        }

        public void UpdateBook(BookEntity events)
        {
            //_context.Books.Update(events);
            var existingBook = _context.Books.Find(events.Id);

            if (existingBook != null)
            {
                _context.Entry(existingBook).CurrentValues.SetValues(events);
                _unitOfWork.Commit();
            }
            
        }

        public bool BookModelExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }

    }
}
