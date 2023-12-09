using BookMngmtDAL.Backend_Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookMngmtDAL.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;

        public UnitOfWork(DataContext context)
        {
            _context = context;
        }

        public void Commit()
        {
            _context.SaveChanges();
        }
    }
}
