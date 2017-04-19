using LunchPollServer.DataTransfer;

namespace LunchPollServer.Controllers
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User GetUser() => _userRepository.GetUserByGoogleOAuth2Sub(GetUserId());

        public string GetUserId() => _userRepository.GetUserId();
    }
}