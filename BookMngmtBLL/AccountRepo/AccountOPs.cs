using BookMngmtDAL.Backend_Data;
using BookMngmtDAL.Entities;
using BookMngmtDAL.UnitOfWork;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BookMngmtBLL.AccountRepo
{
    public class AccountOPs : IAccountOPs
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;

        public AccountOPs(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, IUnitOfWork unitOfWork)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _unitOfWork = unitOfWork;
        }

        public async Task<string> PasswordSigninAsync(LogedIn signInModel)
        {
            var user = await _userManager.FindByEmailAsync(signInModel.Email);

            if (user == null)
            {
                // Handle invalid user
                return null;
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, signInModel.Password, false);

            if (result.Succeeded)
            {
                // Generate a JWT token
                var Token = GenerateJwtToken(user);
                var isLogedin = true;

                var userTokenInfo = new
                {
                    token = Token,
                    Email = user.Email,
                    LogedIn = isLogedin,
                    BookToken = user.Tokens_Available,
                    Name = user.Name
                };

                var userTokenInfoJson = JsonConvert.SerializeObject(userTokenInfo);
                return userTokenInfoJson;
            }

            // Handle failed login
            return null;


        }

        public async Task  UpdateUserBorrow(string userId1, string userId2)
        {
            var user1 = await _userManager.FindByEmailAsync(userId1);
            var user2 = await _userManager.FindByEmailAsync(userId2);

            if (user1 != null && user2!= null)
            {
                user1.Books_Borrowed++;
                user1.Tokens_Available--;
                user2.Books_Lent++;
                user2.Tokens_Available++;

                try
                {
                     _unitOfWork.Commit();
                    Console.WriteLine("Updated user data");
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    // Handle concurrency exception, if needed
                    Console.WriteLine($"Concurrency exception: {ex.Message}");
                }
                catch (Exception ex)
                {
                    // Handle other exceptions
                    Console.WriteLine($"Error updating user data: {ex.Message}");
                }
            }


        }

        //public async Task UpdateUserLent(string userId)
        //{
        //    var user = await _userManager.FindByEmailAsync(userId);

        //    if (user != null)
        //    {
        //        user.Books_Lent++;
        //        user.Tokens_Available++;

        //        try
        //        {
        //            await _context.SaveChangesAsync();
        //            Console.WriteLine("Updated user data");
        //        }
        //        catch (DbUpdateConcurrencyException ex)
        //        {
        //            // Handle concurrency exception, if needed
        //            Console.WriteLine($"Concurrency exception: {ex.Message}");
        //        }
        //        catch (Exception ex)
        //        {
        //            // Handle other exceptions
        //            Console.WriteLine($"Error updating user data: {ex.Message}");
        //        }
        //    }



        //}


        public async Task SignOutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        private string GenerateJwtToken(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName)
                // Add more claims as needed
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["JwtSettings:DurationInMinutes"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
