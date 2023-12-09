using BookMngmtDAL.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookManagementApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private BookMngmtBLL.AccountRepo.IAccountOPs _acc = null;

        public AccountController(BookMngmtBLL.AccountRepo.IAccountOPs accRepo)
        {
            _acc = accRepo;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LogedIn loginModel)
        {
            var token = await _acc.PasswordSigninAsync(loginModel);
            if (token != null)
            {
                return Ok(token);
            }
            return Unauthorized("Invalid login attempt");
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _acc.SignOutAsync();
            return Ok(new { Message = "User Logout successfully" });
        }
    }
}
