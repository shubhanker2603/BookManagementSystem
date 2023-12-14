using AutoMapper;
using BookMngmtBLL.BLLModels;
using BookMngmtDAL.Entities;
using DomainModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookManagementApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookMngmtController : Controller
    {
        // using mapper for mapping different data model with same attribute to maintain loose binding

        private readonly BookMngmtBLL.BooksRepo.IBooksBLLOPs _book = null;
        private readonly BookMngmtBLL.AccountRepo.IAccountOPs _acc = null;
        private readonly BookMngmtBLL.CommentRepo.ICommentBLLops _cmnt = null;
        private Mapper _MapperEvent;
        private Mapper _MapperEvent2;

        public BookMngmtController(BookMngmtBLL.BooksRepo.IBooksBLLOPs book, BookMngmtBLL.AccountRepo.IAccountOPs acc, BookMngmtBLL.CommentRepo.ICommentBLLops cmnt)
        {
            _book = book;
            _acc = acc;
            _cmnt = cmnt;

            var _configEvent = new MapperConfiguration(cfg => cfg.CreateMap<BookModel, BookDomain>().ReverseMap());
           
            _MapperEvent = new Mapper(_configEvent);

            var _configEvent2 = new MapperConfiguration(cfg => cfg.CreateMap<CommentModel, CommentsDomain>().ReverseMap());

            _MapperEvent2 = new Mapper(_configEvent2);

        }

        // API for getting list of books

        [HttpGet]
        [Route("books")]

        public IActionResult GetAllBooks()
        {
            List<BookModel> AllBooks = _book.GetAllBooks();
            List<BookDomain> eventModel = _MapperEvent.Map<List<BookModel>, List<BookDomain>>(AllBooks);

            return Ok(eventModel);
        }

        // API for getting book by Id

        [HttpGet]
        [Route("books/{id}")]
        [Authorize]
        public IActionResult GetBookById(int id)
        {
            var item = _book.GetBookById(id);
            if (item == null)
                return NotFound();

            BookDomain eventModel = _MapperEvent.Map<BookModel, BookDomain>(item);
            return Ok(eventModel);
        }

        //API for adding new book to database

        [HttpPost]
        [Route("books/addbook")]
        [Authorize]
        public IActionResult CreateItem([FromBody] BookDomain newBook)
        {
            BookModel itemEntity = _MapperEvent.Map<BookDomain, BookModel>(newBook);
            _book.AddBook(itemEntity);
            return CreatedAtAction(nameof(GetBookById), new { id = newBook.Id }, newBook);

        }

        // API for implementing Borrow Book Functionality

        [HttpPut]
        [Route("books/borrow/{id}/{lent_id}/{rent_id}/{rating}")]
        public IActionResult BorrowFnc(int id, string lent_id,string rent_id, int rating)
        {
            
            _book.EditBook(id, rent_id,rating);

            _acc.UpdateUserBorrow(rent_id, lent_id);
           

            return Ok();

        }

        // Api for implementation of return Book functionality

        [HttpPut]
        [Route("books/returnBook/{id}")]
        public IActionResult ReturnBook(int id)
        {
            _book.ReturnFnc(id);
            
            return Ok();
        }

        // API for adding reviews to book

        [HttpPost]
        [Route("books/addreview")]
        public IActionResult ReviewPost([FromBody] CommentsDomain cmnt)
        {
            CommentModel BookReview = _MapperEvent2.Map<CommentsDomain, CommentModel>(cmnt);
            _cmnt.AddCmnt(BookReview);
            return Ok();

        }

        //API for getting list of reviews on a book

        [HttpGet]
        [Route("books/reviewList")]
        public IActionResult ReviewsList(int id)
        {
            List<CommentModel> AllCmnts = _cmnt.GetAllCmnts(id);
            List<CommentsDomain> cmnts = _MapperEvent.Map<List<CommentModel>, List<CommentsDomain>>(AllCmnts);

            return Ok(cmnts);

        }
    }
}
