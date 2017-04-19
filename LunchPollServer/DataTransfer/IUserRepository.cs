namespace LunchPollServer.DataTransfer
{
    public interface IUserRepository
    {
        User GetUserByGoogleOAuth2Sub(string googleOAuth2Sub);
        string GetUserId();
    }
}