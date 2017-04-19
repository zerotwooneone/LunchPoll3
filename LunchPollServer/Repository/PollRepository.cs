using System.Linq;
using LunchPollServer.DataTransfer;

namespace LunchPollServer.Repository
{
    public class PollRepository : IPollRepository
    {
        private readonly LunchPollContext _lunchPollContext;

        public PollRepository(LunchPollContext lunchPollContext)
        {
            _lunchPollContext = lunchPollContext;
        }

        public DataTransfer.Poll GetPollByUrlParam(string urlParam)
        {
            return Convert(
                (from poll in _lunchPollContext.Polls
                 where poll.UrlParam == urlParam
                 select poll)
                .FirstOrDefault());
        }

        private DataTransfer.Poll Convert(Poll poll)
        {
            return new DataTransfer.Poll
            {

            };
        }
    }
}