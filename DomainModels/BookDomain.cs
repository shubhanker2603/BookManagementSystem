using System;

namespace DomainModels
{
    public class BookDomain
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Rating { get; set; }

        public string Author { get; set; }

        public string Genre { get; set; }

        public string BookAvailable { get; set; }

        public string Description { get; set; }

        public string Lenter { get; set; }

        public string Borrower { get; set; }
    }
}
