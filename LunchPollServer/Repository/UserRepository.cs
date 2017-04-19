using System.Linq;
using LunchPollServer.DataTransfer;
using Microsoft.AspNetCore.Http;

namespace LunchPollServer.Repository
{
    public class TokenIdUserRepository : IUserRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly LunchPollContext _lunchPollContext;

        public TokenIdUserRepository(IHttpContextAccessor httpContextAccessor,
            LunchPollContext lunchPollContext)
        {
            _httpContextAccessor = httpContextAccessor;
            _lunchPollContext = lunchPollContext;
        }

        public DataTransfer.User GetUserByGoogleOAuth2Sub(string googleOAuth2Sub)
        {
            return Convert((from user in _lunchPollContext.Users
                            where user.GoodleOAuth2Sub == googleOAuth2Sub
                            select user)
                    .FirstOrDefault());
        }

        private DataTransfer.User Convert(User user)
        {
            return new DataTransfer.User
            {
                UserId = user.UserId
            };
        }

        public string GetUserId()
        {
            return _httpContextAccessor.HttpContext.User.Claims.First(c => c.Type == "user_id").Value;
        }
    }
}
