using System.Collections.Generic;

namespace LunchPollServer.Repository
{
    public partial class PinnedPoll
    {
        public long PinnedPollId { get; set; }
        public string UrlParam { get; set; }

        public HashSet<Poll> Polls { get; set; }
    }
}
