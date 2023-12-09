using BookMngmtDAL.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookMngmtDAL.Backend_Data
{
    public static class ContextSeed
    {
        public static async Task SeedAdminAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var User1 = new ApplicationUser
            {
                UserName = "prince@123.com",
                Email = "prince@123.com",
                Name = "Prince",
                Tokens_Available = 4,
                Books_Borrowed = 0,
                Books_Lent = 0,
                EmailConfirmed = true,
                PhoneNumberConfirmed = true
            };
            if (userManager.Users.All(u => u.Id != User1.Id))
            {
                var user = await userManager.FindByEmailAsync(User1.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(User1, "Prince@123");

                }

            }

            var User2 = new ApplicationUser
            {
                UserName = "yash@123.com",
                Email = "yash@123.com",
                Name = "Yash",
                Tokens_Available = 2,
                Books_Borrowed = 0,
                Books_Lent = 0,
                EmailConfirmed = true,
                PhoneNumberConfirmed = true
            };
            if (userManager.Users.All(u => u.Id != User2.Id))
            {
                var user = await userManager.FindByEmailAsync(User2.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(User2, "Yash@123");

                }

            }

            var User3 = new ApplicationUser
            {
                UserName = "varun@123.com",
                Email = "Varun@123.com",
                Name = "Varun Rathi",
                Tokens_Available = 1,
                Books_Borrowed = 0,
                Books_Lent = 0,
                EmailConfirmed = true,
                PhoneNumberConfirmed = true
            };
            if (userManager.Users.All(u => u.Id != User3.Id))
            {
                var user = await userManager.FindByEmailAsync(User3.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(User3, "Varun@123");

                }

            }

            var User4 = new ApplicationUser
            {
                UserName = "Naveen@123.com",
                Email = "Naveen@123.com",
                Name = "Naveen Sharma",
                Tokens_Available = 0,
                Books_Borrowed = 0,
                Books_Lent = 0,
                EmailConfirmed = true,
                PhoneNumberConfirmed = true
            };
            if (userManager.Users.All(u => u.Id != User4.Id))
            {
                var user = await userManager.FindByEmailAsync(User4.Email);
                if (user == null)
                {
                    await userManager.CreateAsync(User4, "Naveen@123");

                }

            }
        }
    }
}
