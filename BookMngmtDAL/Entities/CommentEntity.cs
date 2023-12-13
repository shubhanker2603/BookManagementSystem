using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BookMngmtDAL.Entities
{
    public class CommentEntity
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public int BookId { get; set; }

        public string Comment { get; set; }

        public DateTime Date { get; set; }
    }
}
