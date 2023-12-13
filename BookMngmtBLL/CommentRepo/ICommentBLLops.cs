using BookMngmtBLL.BLLModels;
using System.Collections.Generic;

namespace BookMngmtBLL.CommentRepo
{
    public interface ICommentBLLops
    {
        void AddCmnt(CommentModel eventModel);
        List<CommentModel> GetAllCmnts(int id);
    }
}