using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookMngmtDAL.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public int Tokens_Available { get; set; }
        public int Books_Borrowed { get; set; }
        public int Books_Lent { get; set; }
    }
}
