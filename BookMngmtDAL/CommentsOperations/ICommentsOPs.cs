using BookMngmtDAL.Entities;
using System.Collections.Generic;

namespace BookMngmtDAL.CommentsOperations
{
    public interface ICommentsOPs
    {
        List<CommentEntity> GetAllComments(int BookId);
        void PostComment(CommentEntity comment);
    }
}