using BookMngmtDAL.Entities;
using System.Threading.Tasks;

namespace BookMngmtBLL.AccountRepo
{
    public interface IAccountOPs
    {
        Task<string> PasswordSigninAsync(LogedIn signInModel);
        Task UpdateUserBorrow(string userId1, string userId2);
        Task SignOutAsync();
    }
}