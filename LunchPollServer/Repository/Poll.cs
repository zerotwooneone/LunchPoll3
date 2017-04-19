using System.Collections.Generic;

namespace LunchPollServer.Repository
{
    public class Poll
    {
        public long PollId { get; set; }
        public string UrlParam { get; set; }
        public long? PinnedPollId { get; set; }

        public virtual PinnedPoll PinnedPoll { get; set; }
        public HashSet<Nomination> Nominations { get; set; }
    }
}
