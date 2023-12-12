using AutoMapper;
using BookMngmtBLL.BLLModels;
using BookMngmtDAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookMngmtBLL.BooksRepo
{
    public class BooksBLLOPs : IBooksBLLOPs
    {
        private BookMngmtDAL.BookOperations.IBooksOP _DAL = null;
        private Mapper _MapperEvent;

        public BooksBLLOPs(BookMngmtDAL.BookOperations.IBooksOP dal)
        {
            _DAL = dal;

            var _configEvent = new MapperConfiguration(cfg => cfg.CreateMap<BookEntity, BookModel>().ReverseMap());

            _MapperEvent = new Mapper(_configEvent);

        }

        public List<BookModel> GetAllBooks()
        {
            List<BookEntity> EventFromDB = _DAL.GetAllBooks();
            List<BookModel> eventModel = _MapperEvent.Map<List<BookEntity>, List<BookModel>>(EventFromDB);

            return eventModel;
        }

        public BookModel GetBookById(int? id)
        {
            if (id == null)
            {
                throw new NotImplementedException();
            }

            var eventEntity = _DAL.GetBookById(id);


            if (eventEntity == null)
            {
                throw new NotImplementedException();
            }

            BookModel eventModel = _MapperEvent.Map<BookEntity, BookModel>(eventEntity);

            return eventModel;
        }

        public void AddBook(BookModel eventModel)
        {
            BookEntity eventEntity = _MapperEvent.Map<BookModel, BookEntity>(eventModel);
            _DAL.PostItem(eventEntity);
        }

        public void EditBook(int id , string Borrower, int rating)
        {
           BookModel BorrowedBook = GetBookById(id);

            int r1 = BorrowedBook.Rating;
            int AvgRating = (r1 + rating) / 2;

            BorrowedBook.Borrower = Borrower;
            BorrowedBook.BookAvailable = "NO";
            BorrowedBook.Rating = AvgRating;

            BookEntity eventEntity = _MapperEvent.Map<BookModel, BookEntity>(BorrowedBook);

            try
            {
                _DAL.UpdateBook(eventEntity);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_DAL.BookModelExists(id))
                {
                    throw new NotImplementedException();
                }
                else
                {
                    throw;
                }
            }


        }

        public void ReturnFnc(int? id)
        {
            if(id == null)
            {
                throw new NotImplementedException();
            }

            BookModel BorrowedBook = GetBookById(id);

            BorrowedBook.BookAvailable = "yes";
            BorrowedBook.Borrower = "";

            BookEntity ReturnedBook = _MapperEvent.Map<BookModel, BookEntity>(BorrowedBook);

            try
            {
                _DAL.UpdateBook(ReturnedBook);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_DAL.BookModelExists((int)id))
                {
                    throw new NotImplementedException();
                }
                else
                {
                    throw;
                }
            }

        }

    }
}
