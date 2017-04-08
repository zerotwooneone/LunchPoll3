namespace LunchPollServer.DataTransfer
{
    public interface IUserRepository
    {
        User GetUser();
        string GetUserId();
    }
}