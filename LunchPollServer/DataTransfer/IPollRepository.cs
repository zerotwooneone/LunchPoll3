namespace LunchPollServer.DataTransfer
{
    public interface IPollRepository
    {
        Poll GetPollByUrlParam(string urlParam);
    }
}