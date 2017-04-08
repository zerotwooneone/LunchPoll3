using System.Linq;
using System.Security.Claims;
using LunchPollServer.DataTransfer;
using Microsoft.AspNetCore.Http;

namespace LunchPollServer.Repository
{
    public class TokenIdUserRepository: IUserRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TokenIdUserRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public User GetUser()
        {
            return new User
            {
                UserId = GetUserId()
            };
        }

        public string GetUserId()
        {
            return _httpContextAccessor.HttpContext.User.Claims.First(c => c.Type == "user_id").Value;
        }
    }
}
