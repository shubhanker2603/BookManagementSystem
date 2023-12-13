using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModels
{
    public class CommentsDomain
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int BookId { get; set; }

        public string Comment { get; set; }

        public DateTime Date  { get; set; }

    }
}
