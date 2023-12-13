using AutoMapper;
using BookMngmtBLL.BLLModels;
using BookMngmtDAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookMngmtBLL.CommentRepo
{
    public class CommentBLLops : ICommentBLLops
    {
        private BookMngmtDAL.CommentsOperations.ICommentsOPs _DAL = null;
        private Mapper _MapperEvent;

        public CommentBLLops(BookMngmtDAL.CommentsOperations.ICommentsOPs dal)
        {
            _DAL = dal;

            var _configEvent = new MapperConfiguration(cfg => cfg.CreateMap<CommentEntity, CommentModel>().ReverseMap());

            _MapperEvent = new Mapper(_configEvent);

        }

        // Business Logic for Getting list of comments on book

        public List<CommentModel> GetAllCmnts(int id)
        {
            List<CommentEntity> EventFromDB = _DAL.GetAllComments(id);
            List<CommentModel> cmntList = _MapperEvent.Map<List<CommentEntity>, List<CommentModel>>(EventFromDB);

            return cmntList;
        }

        //Business logic Adding new comment to Book to database 
        public void AddCmnt(CommentModel eventModel)
        {
            CommentEntity cmnt = _MapperEvent.Map<CommentModel, CommentEntity>(eventModel);
            _DAL.PostComment(cmnt);
        }
    }
}
