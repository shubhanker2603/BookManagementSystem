using BookMngmtDAL.Backend_Data;
using BookMngmtDAL.Entities;
using BookMngmtDAL.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BookMngmtDAL.CommentsOperations
{
    public class CommentsOPs : ICommentsOPs
    {
        private readonly DataContext _context;
        private readonly IUnitOfWork _unitOfWork;

        public CommentsOPs(DataContext context, IUnitOfWork unitOfWork)
        {
            _context = context;
            _unitOfWork = unitOfWork;
        }

        public List<CommentEntity> GetAllComments(int BookId)
        {

            return _context.Comments.Where(x => x.BookId == BookId).ToList();
        }

        public void PostComment(CommentEntity comment)
        {

            _context.Comments.Add(comment);
            _unitOfWork.Commit();
        }
    }
}
