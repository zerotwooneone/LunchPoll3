using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LunchPollServer.Repository
{
    public class Nomination
    {
        public int NominationId { get; set; }
        [StringLength(140,MinimumLength = 1)]
        public string Name { get; set; }
        public DateTime CreatedOn { get; set; }
        public string UserId { get; set; }
        public long? PinnedPollId { get; set; }
        public long? PollId { get; set; }

        public HashSet<Veto> Vetoes { get; set; }
        public HashSet<Approve> Approves { get; set; }
        public virtual PinnedPoll PinnedPoll{get; set; }
        public virtual Poll Poll { get; set; }
        

        public Nomination()
        {
            Vetoes = new HashSet<Veto>();
            Approves = new HashSet<Approve>();
            CreatedOn = DateTime.Now;
        }
    }
}
